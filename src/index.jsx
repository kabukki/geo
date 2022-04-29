import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { useSpring } from 'react-spring';
import { geoCentroid, geoGraticule10 } from 'd3-geo';
 
import { Globe } from './Globe';

import world from './countries.json';

const graticule = geoGraticule10();
const countries = world.features.filter(({ properties }) => !!properties.capital);

const App = () => {
    // Start with a random country
    const [country, setCountry] = useState(() => countries[Math.floor(Math.random() * countries.length)]);
    const features = useMemo(() => [
        {
            feature: graticule,
            fill: 'none',
            stroke: '#404040',
        },
        ...world.features.map((feature) => ({
            feature,
            fill: feature.properties.iso === country?.properties.iso ? '#d4d4d4' : "#737373",
            stroke: '#171717',
        })),
    ], [country]);
    const center = useMemo(() => {
        const [lng, lat] = country ? geoCentroid(country) : [0, 0];
        return { lat, lng };
    }, [country]);
    const { lat, lng } = useSpring(center);

    return (
        <div className="h-screen flex flex-col bg-gray-100">
            <div>
                <h1>{country?.properties.emoji} {country?.properties.name}</h1>
                <h2>{country?.properties.capital}</h2>
                <h3>{country?.properties.continent}</h3>
            </div>
            <Globe features={features} country={country} lat={lat} lng={lng} scale={1}  />
            <select value={country?.properties.iso} onChange={e => setCountry(countries.find(({ properties }) => properties.iso === e.target.value))}>
                {Object.entries(
                    countries.reduce((acc, country) => {
                        acc[country.properties.continent] = (acc[country.properties.continent] || []);
                        acc[country.properties.continent].push(country);
                        return acc;
                    }, {})
                ).map(([continent, countries]) => (
                    <optgroup key={continent} label={continent}>
                        {countries.map(({ properties }) => (
                            <option key={properties.iso} value={properties.iso}>
                                {properties.name}
                            </option>
                        ))}
                    </optgroup>
                ))}
            </select>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));
