import React from 'react';
import { useChartState } from '../chartContext/chartContext';
import { separateThousands } from '../../../utils/separateThousands';

import { TickMask, TickText, TickItem, Container } from './styled';

export const ValuesAxis = () => {
  const { yScale, ticks } = useChartState();

  return (
    <Container>
      {ticks.map(tick => {
        return (
          <TickMask key={tick} variant="footnoteBold" style={{ opacity: 0 }}>
            {separateThousands(tick)}
          </TickMask>
        );
      })}
      {ticks.map(tick => {
        return (
          <TickItem key={tick} style={{ transform: [{ translateY: yScale(tick) }] }}>
            <TickText variant="footnoteBold">{separateThousands(tick)}</TickText>
          </TickItem>
        );
      })}
    </Container>
  );
};
