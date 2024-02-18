import i18n from 'i18n-js';
import React, { FC, useEffect } from 'react';
import { ErrorMessage } from '../../../../components/ErrorMessage';
import { Alert } from 'react-native';
import { Loader } from '../../../../components/Loader';
import { MixedList } from '../../../../components/MixedList';
import { useTheme } from 'styled-components/native';
import { useModalsDispatch } from '../../../../contexts/modals';
import { PlusIcon } from '../../../../icons/PlusIcon';
import { useDeleteCurrency, useGetCurrencies } from '../../../../hooks/currencies';

export const CurrenciesList: FC = () => {
  const {
    colors: { systemBlue },
  } = useTheme();
  const { data, isLoading, error } = useGetCurrencies();
  const dispatch = useModalsDispatch();
  const { mutate: deleteCurrency, isError, error: deleteError } = useDeleteCurrency();

  useEffect(() => {
    if (isError) {
      Alert.alert(i18n.t('common.state.error'), deleteError);
    }
  }, [isError]);

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <MixedList
      title={i18n.t('currencies.title')}
      data={[
        {
          id: -1,
          title: i18n.t('currencies.action.add'),
          titleColor: 'systemBlue',
          leftContent: <PlusIcon color={systemBlue} size={24} />,
          onPress: () => dispatch({ type: 'setCurrencyModal', payload: undefined }),
        },
        ...data.map(item => {
          return {
            id: item.id,
            title: item.code || i18n.t('transactions.emptyTitle'),
            titleColor: 'textPrimary',
            subtitle: item.symbol,
            onPress: () => dispatch({ type: 'setCurrencyModal', payload: { id: item.id } }),
            onDelete: () => deleteCurrency(item.id),
          };
        }),
      ]}
    />
  );
};
