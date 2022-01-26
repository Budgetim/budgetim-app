import React, { FC, useState } from 'react';

import { DatesAxis } from './DatesAxis';
import { Header } from './Header';
import { ChartProvider } from './chartContext/chartContext';
import { Chart } from './Chart';
import { ValuesAxis } from './ValuesAxis';
import { LineChartProps } from './types';
import { ChartWrapper, Content } from './styled';

export const LineChart: FC<LineChartProps> = props => {
  const [width, setWidth] = useState(0);
  return (
    <ChartProvider {...props} width={width}>
      <Header {...props} />
      <Content>
        <ChartWrapper onLayout={event => setWidth(event.nativeEvent.layout.width)}>
          <Chart />
        </ChartWrapper>
        <ValuesAxis />
      </Content>
      <DatesAxis />
    </ChartProvider>
  );
};
