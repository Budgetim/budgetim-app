import React, { FC } from 'react';
import { useTheme } from 'styled-components/native';
import { CurrenciesListProps } from './types';
import { useGetCurrencies } from '../../../../../../hooks/currencies';
import { MixedList } from '../../../../../../components/MixedList';
import { CheckIcon } from '../../../../../../icons/CheckIcon';
import i18n from 'i18n-js';
import { PlusIcon } from '../../../../../../icons/PlusIcon';
import { useModalsDispatch } from '../../../../../../contexts/modals';

export const CurrenciesList: FC<CurrenciesListProps> = ({ activeCurrencyId, setCurrencyId }) => {
  const { data } = useGetCurrencies();
  const {
    colors: { systemGray06, systemBlue },
  } = useTheme();
  const modalDispatch = useModalsDispatch();
  return (
    <MixedList
      title={i18n.t('settings.currency.title')}
      data={[
        {
          id: -1,
          title: i18n.t('currencies.action.add'),
          titleColor: 'systemBlue',
          leftContent: <PlusIcon color={systemBlue} size={24} />,
          onPress: () => modalDispatch({ type: 'setCurrencyModal', payload: undefined }),
        },
        ...(data?.map(currency => {
          return {
            id: currency.id,
            title: currency.symbol,
            titleColor: currency.symbol ? 'textPrimary' : 'textSecondary',
            subtitle: currency.title,
            rightContent: <CheckIcon color={currency.id === activeCurrencyId ? systemBlue : systemGray06} size={28} />,
            isActive: currency.id === activeCurrencyId,
            onPress: () => setCurrencyId(currency.id),
          };
        }) || []),
      ]}
    />
  );
};
