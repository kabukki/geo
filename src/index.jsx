import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { useSpring } from 'react-spring';
import { geoCentroid, geoGraticule10 } from 'd3-geo';
import colors from 'tailwindcss/colors';

import { Globe } from './Globe';
import world from './countries.json';
import './index.css';

const graticule = geoGraticule10();

const App = () => {
    const [countries] = useState(() => world.features.filter(({ properties }) => !!properties.capital).sort(() => Math.random() - 0.5));
    const [index, setIndex] = useState(170);
    const [reveal, setReveal] = useState([]);
    const country = countries[index];
    const center = useMemo(() => {
        const [lng, lat] = country ? geoCentroid(country) : [0, 0];
        return { lat, lng };
    }, [country]);
    const features = useMemo(() => [
        {
            feature: graticule,
            fill: 'none',
            stroke: colors.neutral[700],
        },
        ...world.features.map((feature) => ({
            feature,
            fill: feature.properties.iso === country?.properties.iso ? colors.yellow[100] : countries.some(({ properties }) => properties.iso === feature.properties.iso) ? colors.yellow[500] : colors.yellow[700],
            stroke: colors.neutral[900],
        })),
    ], [country]);
    const { lat, lng } = useSpring(center);

    const onReveal = () => {
        if (reveal.includes('capital')) {
            setReveal([]);
            setIndex((previous) => (previous + 1) % countries.length);
        } else if (reveal.includes('country')) {
            setReveal(['country', 'capital']);
        } else {
            setReveal(['country']);
        }
    };
 
    return (
        <div className="p-4 h-screen container mx-auto flex flex-col gap-4">
            <div className="p-4 flex gap-4 items-center shadow rounded bg-yellow-500">
                <div>
                    {index + 1} / {countries.length}
                </div>
                <div className="flex-1">
                    <h3>{country?.properties.continent}</h3>
                    <div>{reveal.includes('country') ? `${country?.properties.emoji} ${country?.properties.name}` : '???'}</div>
                    <div>{reveal.includes('capital') ? country?.properties.capital : '???'}</div>
                </div>
            </div>
            <div className="h-1/2">
                <Globe
                    className="m-auto w-full max-h-full aspect-square"
                    features={features}
                    lat={lat}
                    lng={lng}
                />
            </div>
            <button className="p-2 rounded bg-yellow-500 text-white" onClick={onReveal}>
                NEXT
            </button>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));
