import React, { FC } from 'react';
import { useTheme } from 'styled-components/native';
import { Wrapper } from './styled';
import { CurrenciesListProps } from './types';
import { useGetCurrencies } from '../../../../../../hooks/currencies';
import { MixedList } from '../../../../../../components/MixedList';
import { CheckIcon } from '../../../../../../icons/CheckIcon';

export const CurrenciesList: FC<CurrenciesListProps> = ({ activeCurrencyId, setCurrencyId }) => {
  const { data } = useGetCurrencies();
  const {
    colors: { bgPrimary, systemBlue },
  } = useTheme();
  return (
    <Wrapper>
      <MixedList
        backgroundColor={bgPrimary}
        data={
          data?.map(currency => {
            return {
              id: currency.id,
              title: currency.symbol,
              subtitle: currency.code,
              rightContent: <CheckIcon color={currency.id === activeCurrencyId ? systemBlue : bgPrimary} size={28} />,
              isActive: currency.id === activeCurrencyId,
              onPress: () => setCurrencyId(currency.id),
            };
          }) || []
        }
      />
    </Wrapper>
  );
};
