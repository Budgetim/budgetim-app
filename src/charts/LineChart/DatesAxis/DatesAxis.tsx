import format from 'date-fns/format';
import locale from 'date-fns/locale/en-US';
import React from 'react';
import { useChartState } from '../chartContext/chartContext';

import { Container, CategoryWrapper, CategoryLabel } from './styled';

export const DatesAxis = () => {
  const { xScale, monthsList } = useChartState();

  return (
    <Container>
      {monthsList.map((item) => {
        const start = xScale(item.days[0]) as number;
        const end = (xScale(item.days[item.days.length - 1]) as number) + xScale.bandwidth();
        const width = end - start;
        return (
          <CategoryWrapper
            key={`${item.month}${item.year}`}
            width={width}
            style={{ transform: [{ translateX: start }]}}
          >
            <CategoryLabel variant="footnoteBold">
              {format(new Date(item.year, item.month, 1), 'LLLL', { locale })}
            </CategoryLabel>
          </CategoryWrapper>
        );
      })}
    </Container>
  )
}
