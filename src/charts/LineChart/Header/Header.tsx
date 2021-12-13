import i18n from 'i18n-js';
import React, { FC, useEffect, useState } from 'react';
import format from 'date-fns/format';

import { useUserState } from '../../../contexts/user';
import { getLocale } from '../../../utils/getLocale';
import { separateThousands } from '../../../utils/separateThousands';
import { getDataLines } from '../utils/getDataLines';
import { useChartState } from '../chartContext/chartContext';
import { Container, HeaderTitle, PriceLabel, Message, PriceText } from './styled';

export const Header: FC = () => {
  const [width, setWidth] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const { currency } = useUserState();
  const { categories, xScale, data, activeIndex } = useChartState();
  const dataLines = getDataLines({ data, categories });
  const locale = getLocale();

  useEffect(() => {
    if (activeIndex !== undefined) {
      const x = (xScale(categories[activeIndex]) as number) + xScale.bandwidth() / 2;
      const calculatedX = x - width / 2;
      setTranslateX(calculatedX < 0 ? 0 : calculatedX);
    }
  }, [activeIndex, width]);

  return (
    <Container>
      {activeIndex !== undefined ? (
        <>
          <HeaderTitle variant="footnoteBold">
            {format(new Date(categories[activeIndex]), 'd MMMM yyyy', { locale })}
          </HeaderTitle>
          <PriceLabel
            onLayout={event => setWidth(event.nativeEvent.layout.width)}
            style={{ transform: [{ translateX }] }}
          >
            <PriceText variant="footnoteBold">
              {separateThousands(dataLines[activeIndex].value)} {currency?.unit}
            </PriceText>
          </PriceLabel>
        </>
      ) : (
        <Message variant="subheadlineBold">{i18n.t('statistics.months.periodTitle')}</Message>
      )}
    </Container>
  );
};
