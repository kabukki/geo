import colors from 'tailwindcss/colors';

export const scoreColor = (score) => score === 0 ? colors.red[500] : score === 1 ? colors.amber[500] : colors.green[500];

export const getScore = (countries) => countries.reduce((total, { score }) => total + score, 0);

export const isSame = (a, b) => a.properties?.iso === b.properties?.iso;
