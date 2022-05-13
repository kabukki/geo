import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { Quiz, Summary, Selection } from './views';
import { isSame } from './utils';

import './index.css';

const App = () => {
    const [collection, setCollection] = useState(null);
    const [todo, setTodo] = useState([]);
    const [done, setDone] = useState([]);

    const onScore = (score, country) => {
        setDone((previous) => [...previous, { score, feature: country }]);
        setTodo((previous) => previous.filter((c) => !isSame(c, country)));
    };

    const onReset = () => {
        setCollection(null);
    };

    const onSelect = (collection) => {
        setCollection(collection);
        setDone([]);
        setTodo(collection.countries);
    };

    return (
        <main className="p-4 container mx-auto max-w-screen-md">
            {collection ? (
                todo.length > 0 ? (
                    <Quiz todo={todo} done={done} onScore={onScore} />
                ) : (
                    <Summary countries={done} onReset={onReset} />
                )
            ) : (
                <Selection onSelect={onSelect} />
            )}
        </main>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));
