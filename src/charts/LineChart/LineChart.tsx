import React, { FC, useState } from 'react';

import { DataItemLineChart } from './types';
import { ChartProvider } from './chartContext/chartContext';
import { SvgChart } from './SvgChart';
import { Grid } from './Grid';
import { View } from 'react-native';

export interface LineChartProps {
  categories: string[];
  height: number;
  data: DataItemLineChart[];
}


export const LineChart: FC<LineChartProps> = props => {
  const [width, setWidth] = useState(0);
  return (
    <ChartProvider {...props} width={width}>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View style={{ flex: 1 }} onLayout={(event) => {
          setWidth(event.nativeEvent.layout.width);
        }}>
          <SvgChart />
        </View>
        <Grid />
      </View>
    </ChartProvider>
  );
};
