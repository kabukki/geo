import React, { useMemo } from 'react';
import { animated, useSpring } from 'react-spring';
import useResizeObserver from 'use-resize-observer';
import { geoCentroid, geoGraticule10, geoOrthographic, geoPath } from 'd3-geo';
import colors from 'tailwindcss/colors';

import world from '../countries.json';

const graticule = geoGraticule10();

const withProjection = (Component) => ({ focus, ...props }) => {
    const { ref, width = 0, height = 0 } = useResizeObserver();
    const [lng, lat] = geoCentroid(focus);
    const projection = geoOrthographic();

    projection
        .rotate([-lng, -lat])
        // .fitExtent([[width * 0.2, height * 0.2], [width - width * 0.2, height - height * 0.2]], focus)
        .translate([width / 2, height / 2])
        .scale(width / 2) // Math.min(width, Math.max(width / 2, projection.scale())),

    const { rotate, scale, translate } = useSpring({
        rotate: projection.rotate(),
        translate: projection.translate(),
        scale: projection.scale(),
    });

    return <Component forwardedRef={ref} width={width} height={height} rotate={rotate} scale={scale} translate={translate} focus={focus} {...props} />;
};

export const Globe = withProjection(animated(({ width, height, styles = {}, focus, rotate, scale, translate, onClick, className, forwardedRef }) => {
    const path = geoPath(geoOrthographic().translate(translate).scale(scale).rotate(rotate));

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
            strokeWidth: '0.5',
            onClick: feature.properties?.iso ? () => onClick?.(feature) : undefined,
            // className: (focus && focus.properties.iso === feature.properties?.iso) ? 'animate-pulse' : '',
        })),
    ], [styles, path]);

    return (
        <div className={className} ref={forwardedRef}>
            <svg width={width} height={height}>
                <circle cx={width / 2} cy={height / 2} r={width / 2} className="fill-neutral-900" />
                {features.map((props, n) => <path key={n} {...props} />)}
            </svg>
        </div>
    );
}));
