import React, { FC } from 'react';
import { Line } from 'react-native-svg';
import { useTheme } from 'styled-components/native';

import { useChartState } from './chartContext/chartContext';

export const VerticalLine: FC = () => {
  const { activeIndex, xScale, yScale, categories } = useChartState();
  const {colors: { systemBlue } } = useTheme();

  if (activeIndex === undefined) {
    return null;
  }

  return (
    <Line
      x={(xScale(categories[activeIndex]) as number) + xScale.bandwidth() / 2}
      y1={0}
      y2={yScale.range()[0]}
      strokeWidth={1}
      stroke={systemBlue}
    />
  );
};
