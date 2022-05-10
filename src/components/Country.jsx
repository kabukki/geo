import React from 'react';
import classNames from 'classnames';

export const Country = ({ feature, className, ...props }) => {
    return (
        <div className={classNames(className, 'flex gap-4')} {...props}>
            <div>{feature.properties.emoji}</div>
            <div>
                <span className="font-bold">{feature.properties.name}</span>
                , {feature.properties.capital}
            </div>
        </div>
    );
};
