import React, { useRef } from 'react';
import { animated } from 'react-spring';
import { geoOrthographic, geoPath } from 'd3-geo';

export const Globe = animated(({ features, lat, lng, scale }) => {
    const ref = useRef();
    const size = 500;

    const projection = geoOrthographic()
        .translate([size / 2, size / 2])
        .scale(scale * size / 2)
        .clipAngle(90)
        .rotate([-lng, -lat]);
    const path = geoPath(projection);

    return (
        <svg ref={ref} width={size} height={size}>
            <circle cx={size / 2} cy={size / 2} r={size / 2} fill="#171717" />
            {features.map(({ feature, fill, stroke }, n) => (
                <path
                    key={n}
                    d={path(feature)}
                    fill={fill}
                    stroke={stroke}
                />
            ))}
        </svg>
    );
});
