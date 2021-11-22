import { area, extent, line, curveLinear } from 'd3';
import React, { FC } from 'react';
import { Svg, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { getScaleLinear } from '../../utils/getScaleLinear';
import { MicroChartProps } from './types';
import { useTheme } from 'styled-components/native';

export const MicroChart: FC<MicroChartProps> = (props) => {
  const { data, width = 70, height = 25 } = props;
  const allValuesAreEmpty = data.every(value => !value);

  if (data.length <= 1 || allValuesAreEmpty) {
    return null;
  }

  const { colors: { chart01 }} = useTheme();

  const yDomain = extent(data) as [number, number];
  const xScale = getScaleLinear([0, data.length - 1], [0, width]);
  const yScale = getScaleLinear(yDomain, [height - 3, 0]);

  const path = line<number>()
    .x((_d, index) => xScale(index) as number)
    .y(d => yScale(d) as number)
    .curve(curveLinear)(data) as string;

  const areaPath = area<number>()
    .x((_d, index) => xScale(index) as number)
    .y0(height)
    .y1(d => yScale(d) as number)
    .curve(curveLinear)(data) as string;

  return (
    <Svg width={width} height={height} style={{ overflow: 'visible' }}>
      <Defs>
        <LinearGradient id="micro-opacity-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopOpacity={0.65} stopColor={chart01} />
          <Stop offset="100%" stopOpacity={0} stopColor={chart01} />
        </LinearGradient>
      </Defs>
      <Path fill="url(#micro-opacity-gradient)" d={areaPath} />
      <Path stroke={chart01} strokeWidth={2} fill="none" d={path} opacity={0.8} />
    </Svg>
  );
};
