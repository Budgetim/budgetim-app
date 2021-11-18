import React, { FC } from 'react';
import { Text, G } from 'react-native-svg';
import { useTheme } from 'styled-components/native';
import { useChartState } from './chartContext/chartContext';

export const Grid: FC = () => {
  const { xScale, categories, height } = useChartState();
  const { colors: { textSecondary },} = useTheme();

  return (
    <G transform={`translate(0, ${height - 4})`}>
      {categories.map((category, index) => {
        return (
          <Text
            key={index}
            fontSize={14}
            fill={textSecondary}
            textAnchor="middle"
            x={(xScale(category) as number) + xScale.bandwidth() / 2}
          >
            {category}
          </Text>
        );
      })}
    </G>
  );
};
