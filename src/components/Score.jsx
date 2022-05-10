import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import colors from 'tailwindcss/colors';

import { scoreColor } from '../utils';

export const Score = ({ score, className, ...props }) => (
    <div className={classNames(className, 'flex gap-2 items-center')} {...props}>
        <FontAwesomeIcon icon={faCheck} color={score >= 2 ? scoreColor(score) : colors.neutral[200]} />
        <FontAwesomeIcon icon={faCheck} color={score >= 1 ? scoreColor(score) : colors.neutral[200]} />
    </div>
);
