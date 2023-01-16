import React, { FC } from 'react';
import { useTheme } from 'styled-components/native';
import { SelectList } from '../../../SelectList';
import { Wrapper } from './styled';
import { CurrenciesListProps } from './types';
import { useCurrenciesState } from '../../../../contexts/currencies';

export const CurrenciesList: FC<CurrenciesListProps> = ({ activeCurrencyId, setCurrencyId }) => {
  const { data } = useCurrenciesState();
  const {
    colors: { bgPrimary },
  } = useTheme();
  return (
    <Wrapper>
      <SelectList
        backgroundColor={bgPrimary}
        onSelect={id => setCurrencyId(id)}
        data={
          data?.map(currency => {
            return {
              id: currency.id,
              title: currency.code,
              unit: currency.symbol,
              isActive: currency.id === activeCurrencyId,
            };
          }) || []
        }
      />
    </Wrapper>
  );
};
