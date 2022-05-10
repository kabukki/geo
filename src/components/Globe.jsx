import React, { useMemo } from 'react';
import { animated, useSpring } from 'react-spring';
import useResizeObserver from 'use-resize-observer';
import { geoGraticule10, geoOrthographic, geoPath, geoCentroid } from 'd3-geo';
import colors from 'tailwindcss/colors';

import world from '../countries.json';

const graticule = geoGraticule10();

const withCoordinates = (Component) => ({ focus, ...props }) => {
    const center = useMemo(() => {
        const [lng, lat] = focus ? geoCentroid(focus) : [0, 0];
        return { lat, lng };
    }, [focus]);
    const { lat, lng } = useSpring(center);

    return <Component lat={lat} lng={lng} focus={focus} {...props} />;
};

export const Globe = withCoordinates(animated(({ styles = {}, focus, lat, lng, onClick, className }) => {
    const { ref, width = 0, height = 0 } = useResizeObserver();

    const path = geoPath(
        geoOrthographic()
            .translate([width / 2, height / 2])
            .scale(width / 2)
            .rotate([-lng, -lat])
            // .fitExtent([[50, 50], [width - 50, height - 50]], focus)
    );

    const features = useMemo(() => [
        {
            d: path(graticule),
            fill: 'none',
            stroke: colors.neutral[700],
        },
        ...world.features.map((feature) => ({
            d: path(feature),
            fill: (focus && focus.properties.iso === feature.properties?.iso) ? colors.neutral[100] : styles[feature.properties?.iso] || colors.neutral[500],
            stroke: colors.neutral[700],
            onClick: feature.properties?.iso ? () => onClick?.(feature) : undefined,
        })),
    ], [styles, path]);

    return (
        <div className={className} ref={ref}>
            <svg width={width} height={height}>
                <circle cx={width / 2} cy={height / 2} r={width / 2} fill={colors.neutral[900]} />
                {features.map((props, n) => <path key={n} {...props} />)}
            </svg>
        </div>
    );
}));
