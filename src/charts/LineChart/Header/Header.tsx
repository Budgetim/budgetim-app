import i18n from 'i18n-js';
import React, { FC } from 'react';
import format from 'date-fns/format';

import { TextVariant } from '../../../components/TextVariant';
import { useUserState } from '../../../contexts/user';
import { separateThousands } from '../../../utils/separateThousands';
import { getDataLines } from '../utils/getDataLines';
import { useChartState } from '../chartContext/chartContext';
import { Container, HeaderTitle, PriceLabel, Message, PriceText } from './styled';

export const Header: FC = () => {
  const { currency } = useUserState();
  const { categories, xScale, data, activeIndex } = useChartState();
  const dataLines = getDataLines({ data, categories });

  return (
    <Container>
      {activeIndex !== undefined ? (
        <>
          <HeaderTitle variant="footnoteBold">
            {format(new Date(categories[activeIndex]), 'd MMMM yyyy')}
          </HeaderTitle>
          <PriceLabel
            style={{
              transform: [{ translateX: xScale(categories[activeIndex]) as number }],
            }}
          >
            <PriceText variant="footnoteBold">
              {separateThousands(dataLines[activeIndex].value)} {currency?.unit}
            </PriceText>
          </PriceLabel>
        </>
      ) : (
        <Message variant="bodyRegular">{i18n.t('statistics.months.periodTitle')}</Message>
      )}
    </Container>
  );
};
