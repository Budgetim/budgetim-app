import * as d3 from 'd3';

export interface DataItemLineChart {
  value: number;
}

export interface DataItem {
  value: number;
  category: string;
}

export type XScale = d3.ScaleBand<string>;
export type YScale = d3.ScaleLinear<number, number>;

export interface LineChartProps {
  categories: string[];
  height: number;
  data: DataItemLineChart[];
}