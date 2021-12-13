import React, { FC } from 'react';
import { Svg, Polyline } from 'react-native-svg';
import { IconProps } from './types';

export const CheckIcon: FC<IconProps> = ({ color, size }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Polyline points="20 6 9 17 4 12" />
    </Svg>
  );
};
