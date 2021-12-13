import React, { FC } from 'react';
import { Svg, Path } from 'react-native-svg';
import { IconProps } from './types';

export const PlusCircleIcon: FC<IconProps> = ({ color, size }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 36 36">
      <Path
        fill={color}
        d="M34,18A16,16,0,1,1,18,2,16,16,0,0,1,34,18Zm-8.41-1.5H19.5V10.41a1.5,1.5,0,0,0-3,0V16.5H10.41a1.5,1.5,0,0,0,0,3H16.5v6.09a1.5,1.5,0,0,0,3,0V19.5h6.09a1.5,1.5,0,0,0,0-3Z"
      />
    </Svg>
  );
};
