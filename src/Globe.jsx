import React from 'react';
import { animated } from 'react-spring';
import { geoOrthographic, geoPath } from 'd3-geo';
import useResizeObserver from 'use-resize-observer';
import colors from 'tailwindcss/colors';

export const Globe = animated(({ features, lat, lng, className }) => {
    const { ref, width = 0, height = 0 } = useResizeObserver();

    const path = geoPath(
        geoOrthographic()
            .translate([width / 2, height / 2])
            .scale(width / 2)
            .rotate([-lng, -lat])
            // .fitExtent([[20, 20], [width - 20, height - 20]], country)
    );

    return (
        <div className={className} ref={ref}>
            <svg width={width} height={height}>
                <circle cx={width / 2} cy={height / 2} r={width / 2} fill={colors.neutral[900]} />
                {features.map(({ feature, fill, stroke }, n) => (
                    <path
                        key={n}
                        d={path(feature)}
                        fill={fill}
                        stroke={stroke}
                    />
                ))}
            </svg>
        </div>
    );
});
