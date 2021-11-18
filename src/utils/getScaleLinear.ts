import { scaleLinear, NumberValue } from 'd3';

export const getScaleLinear = (domain: NumberValue[], range: number[]) => {
  return scaleLinear().domain(domain).range(range);
};
