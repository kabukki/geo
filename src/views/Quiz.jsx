import React, { useEffect, useState } from 'react';

import { Globe, Score, Country } from '../components';
import { getScore, scoreColor } from '../utils';

export const Quiz = ({ todo, done, onScore }) => {
    const [reveal, setReveal] = useState(false);
    const [country] = todo;

    useEffect(() => {
        setReveal(false)
    }, [country]);

    return (
        <div className="p-4 h-screen container mx-auto flex flex-col gap-4">
            <div className="p-2 flex items-center justify-between shadow rounded bg-neutral-100">
                {reveal ? <Country feature={country} /> : '???'}
                <div>{done.length + 1} / {todo.length + done.length}</div>
            </div>
            <Globe
                className="h-1/2 self-center aspect-square drop-shadow-xl"
                styles={done.reduce((acc, { score, feature }) => ({ ...acc, [feature.properties.iso]: scoreColor(score) }), {})}
                focus={country}
            />
            <h1 className="p-2 border-y text-center font-bold">
                Score: {getScore(done)} / {done.length * 2}
            </h1>
            {reveal ? (
                <div className="grid grid-cols-3 gap-4">
                    <button className="p-2 flex flex-col gap-2 items-center justify-center aspect-square shadow rounded text-lg text-red-500" onClick={() => onScore(0, country)}>
                        Aucun
                        <Score score={0} />
                    </button>
                    <button className="p-2 flex flex-col gap-2 items-center justify-center aspect-square shadow rounded text-lg text-amber-500" onClick={() => onScore(1, country)}>
                        Pays seulement
                        <Score score={1} />
                    </button>
                    <button className="p-2 flex flex-col gap-2 items-center justify-center aspect-square shadow rounded text-lg text-green-500" onClick={() => onScore(2, country)}>
                        Pays + Capitale
                        <Score score={2} />
                    </button>
                </div>
            ) : (
                <button className="p-2 shadow rounded bg-neutral-100" onClick={() => setReveal(true)}>
                    RÉPONSE
                </button>
            )}
        </div>
    );
};
