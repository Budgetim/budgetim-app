import * as d3 from 'd3';
import React, { FC } from 'react';
import { useTheme } from 'styled-components/native';
import { G, Path, Circle, LinearGradient, Stop, Defs } from 'react-native-svg';

import { useChartState } from '../chartContext/chartContext';
import { getDataLines } from '../utils/getDataLines';
import { DataItem } from '../types';
import { getAreaLine } from './utils/getAreaLine';

export const Lines: FC = () => {
  const { xScale, yScale, categories, data, activeIndex } = useChartState();
  const dataLines = getDataLines({ data, categories });
  const { colors: { systemBlue } } = useTheme();

  const path = d3
    .line<DataItem>()
    .x(d => (xScale(d.category) || 0) + xScale.bandwidth() / 2)
    .y(d => yScale(d.value as number) as number);

  const curve = path.curve(d3.curveLinear);

  const pathFull = curve(dataLines) as string;

  return (
    <G>
      <Defs>
        <LinearGradient id="opacity-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopOpacity={0.4} stopColor={systemBlue} />
          <Stop offset="100%" stopOpacity={0} stopColor={systemBlue} />
        </LinearGradient>
      </Defs>
      <Path
        fill="url(#opacity-gradient)"
        d={getAreaLine({ data: dataLines, yScale, xScale })}
      />
      <Path fill="none" strokeWidth={2} stroke={systemBlue} d={pathFull} />
      {dataLines.map((item, index) => {
        if (index !== activeIndex) {
          return null;
        }

        return (
          <Circle
            key={index}
            cx={(xScale(item.category) as number) + xScale.bandwidth() / 2}
            cy={yScale(item.value)}
            r={3.5}
            fill={systemBlue}
          />
        );
      })}
    </G>
  );
};
