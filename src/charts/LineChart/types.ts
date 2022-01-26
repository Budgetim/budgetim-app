import * as d3 from 'd3';

export interface DataItemLineChart {
  value: number;
}

export type XScale = d3.ScaleBand<string>;
export type YScale = d3.ScaleLinear<number, number>;

export interface LineChartProps {
  categories: string[];
  height: number;
  data: DataItemLineChart[];
  modes: {
    title: string;
  }[];
  activeModeIndex: number;
  setActiveModeIndex: (index: number) => void;
}
