import * as d3 from 'd3';
import { DataItem, XScale, YScale } from '../../types';
import { curveLinear } from 'd3';

interface GetAreaLineProps {
  xScale: XScale;
  yScale: YScale;
  data: DataItem[];
}

export const getAreaLine = ({ data, xScale, yScale }: GetAreaLineProps) => {
  // d3 неправильно рисует из коробки ровные линии, если они с градиентом
  const allEqual = data.every((item, i, arr) => item.value === arr[0].value);

  if (allEqual) {
    if (data.length > 0 && data[0].value === 0) {
      return '';
    }

    const x = (xScale(data[0].category) as number) + xScale.bandwidth() / 2;
    const y = yScale(data[0].value as number) as number;
    const w = xScale(data[data.length - 1].category) as number;
    const h = y - yScale.range()[1];

    return `M${x} ${y} H ${x + w} V ${y + h} H ${x} Z`;
  }

  const path = d3
    .area<DataItem>()
    .x(d => ((xScale(d.category) as number) + xScale.bandwidth() / 2) as number)
    .y0(d => yScale(d.value as number) as number)
    .y1(() => yScale.range()[0]);

  const curve = path.curve(d3.curveLinear)(data);

  return curve || '';
};
