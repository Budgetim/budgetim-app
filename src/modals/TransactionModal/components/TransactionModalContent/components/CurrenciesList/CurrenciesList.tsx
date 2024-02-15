import React, { FC } from 'react';
import { useTheme } from 'styled-components/native';
import { Wrapper } from './styled';
import { CurrenciesListProps } from './types';
import { useGetCurrencies } from '../../../../../../hooks/currencies';
import { MixedList } from '../../../../../../components/MixedList';
import { CheckIcon } from '../../../../../../icons/CheckIcon';
import i18n from 'i18n-js';

export const CurrenciesList: FC<CurrenciesListProps> = ({ activeCurrencyId, setCurrencyId }) => {
  const { data } = useGetCurrencies();
  const {
    colors: { systemGray06, systemBlue },
  } = useTheme();
  return (
    <Wrapper>
      <MixedList
        data={
          data?.map(currency => {
            return {
              id: currency.id,
              title: currency.symbol,
              subtitle: currency.code,
              rightContent: (
                <CheckIcon color={currency.id === activeCurrencyId ? systemBlue : systemGray06} size={28} />
              ),
              isActive: currency.id === activeCurrencyId,
              onPress: () => setCurrencyId(currency.id),
            };
          }) || []
        }
      />
    </Wrapper>
  );
};
