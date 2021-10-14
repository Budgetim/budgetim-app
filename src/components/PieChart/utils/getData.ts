import { getId } from './getId';
import { PieChartDataItem } from '../types';

export const getData = (data: PieChartDataItem[]) => {
  const sum = data.reduce((sum, { value }) => sum + value, 0);

  // край предыдущего сектора [0:1]
  let lastPart = 0;

  return data.map((item, index) => {
    if (index > 0) {
      lastPart += data[index - 1].value / sum;
    }

    const part = item.value / sum; // [0:1],

    // маска сегмента круга должна занимать не больше 1/2 части круга (для нормальной отрисовки градиента)
    const startPartMask = part > 0.5 ? lastPart + part - 0.5 : lastPart;

    return {
      ...item,
      id: getId(),
      part,
      lastPart,
      arc: {
        startAngle: lastPart * Math.PI * 2,
        endAngle: (lastPart + part) * Math.PI * 2,
        cornerRadius: 0,
        fill: item.color,
      },
      arcMask: {
        startAngle: startPartMask * Math.PI * 2,
        endAngle: (lastPart + part) * Math.PI * 2,
        cornerRadius: 0,
        fill: '#fff',
      },
    };
  });
};
