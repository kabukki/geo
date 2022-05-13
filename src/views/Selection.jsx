import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faEarthAfrica, faEarthAmerica, faEarthAsia, faEarthEurope, faEarthOceania } from '@fortawesome/free-solid-svg-icons';

import world from '../countries.json';

const countries = world.features.filter(({ properties }) => !!properties.capital).sort(() => Math.random() - 0.5);

const sets = [
    {
        name: 'Monde',
        icon: faGlobe,
        countries,
    },
    ...[{
        name: 'Amérique du Nord',
        icon: faEarthAmerica,
    }, {
        name: 'Amérique du Sud',
        icon: faEarthAmerica,
    }, {
        name: 'Europe',
        icon: faEarthEurope,
    }, {
        name: 'Afrique',
        icon: faEarthAfrica,
    }, {
        name: 'Asie',
        icon: faEarthAsia,
    }, {
        name: 'Océanie',
        icon: faEarthOceania,
    }].map(({ name, icon }) => ({ name, icon, countries: countries.filter(({ properties }) => properties.continent === name) })),
];

export const Selection = ({ onSelect }) => {
    return (
        <div className="h-screen grid grid-cols-3 gap-4 content-center items-stretch">
            <h1 className="col-span-3 text-center font-bold">🌍 Sélectionnez un continent</h1>
            {sets.map((collection) => (
                <button key={collection.name} className="p-2 flex flex-col gap-2 items-center justify-center shadow rounded text-lg bg-neutral-100" onClick={() => onSelect(collection)}>
                    <FontAwesomeIcon icon={collection.icon} />
                    {collection.name} ({collection.countries.length})
                </button>
            ))}
        </div>
    );
};
