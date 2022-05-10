import React, { useState } from 'react';
import classNames from 'classnames';

import { Country, Globe, Score } from '../components';
import { getScore, isSame, scoreColor } from '../utils';

export const Summary = ({ countries, onReset }) => {
    const [focus, setFocus] = useState(countries[0]);
    const score = getScore(countries);
    const groups = Object.entries(
        countries.reduce((acc, country) => {
            acc[country.feature.properties.continent] = acc[country.feature.properties.continent] || [];
            acc[country.feature.properties.continent].push(country);
            return acc;
        }, {})
    ).map(([continent, countries]) => [continent, countries.sort((a, b) => b.score - a.score || a.feature.properties.name.localeCompare(b.feature.properties.name))])
    .sort(([continentA, countriesA], [continentB, countriesB]) => getScore(countriesB) - getScore(countriesA) || continentA.localeCompare(continentB));

    const onClick = (feature) => {
        const country = countries.find((country) => isSame(country.feature, feature));
        if (country) {
            setFocus(country);
        }
    };

    return (
        <div className="p-4 h-screen container mx-auto flex flex-col gap-4">
            <Country className="p-2 shadow rounded" style={{ backgroundColor: scoreColor(focus.score) }} feature={focus?.feature} />
            <Globe
                className="h-1/2 self-center aspect-square drop-shadow-xl"
                styles={countries.reduce((acc, { score, feature }) => ({ ...acc, [feature.properties.iso]: scoreColor(score) }), {})}
                focus={focus.feature}
                onClick={onClick}
            />
            <h1 className="p-2 border-y text-center font-bold">
                Score final: {score} / {countries.length * 2} 👏
            </h1>
            <div className="flex-1 overflow-auto">
                {groups.map(([continent, countries]) => (
                    <div key={continent}>
                        <h2 className="p-2 font-bold">
                            {continent} ({getScore(countries)} / {countries.length * 2})
                        </h2>
                        <ul>
                            {countries.map((country) => (
                                <li key={country.feature.properties.iso} onClick={() => setFocus(country)} className={classNames('px-2 flex', { 'bg-neutral-100': isSame(country.feature, focus.feature) })} style={{ color: scoreColor(country.score) }}>
                                    <Country className="flex-1" feature={country.feature} />
                                    <Score score={country.score} />
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <button className="p-2 shadow rounded bg-neutral-100" onClick={onReset}>
                TERMINÉ
            </button>
        </div>
    );
};
