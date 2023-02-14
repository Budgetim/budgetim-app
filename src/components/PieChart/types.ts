export interface PieChartDataItem {
  value: number;
  additionalValue: number;
  color: string;
}

export interface PieChartProps {
  /** массив значений */
  data: PieChartDataItem[];
  /** внутренний радиус */
  innerRadius: number;
  /** толщина внутренней линии */
  segmentWidth: number;
  /** толщина внешней линии */
  outerSegmentWidth: number;
}
