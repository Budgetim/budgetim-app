import i18n from 'i18n-js';
import React, { FC } from 'react';
import { ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import format from 'date-fns/format';
import { getLocale } from '../../utils/getLocale';

import { StackParamList } from '../types';
import { TransactionsProvider } from '../../contexts/transactions';
import { TransactionsList } from '../../components/TransactionsList';
import { EditTransactionModal } from '../../components/EditTransactionModal';
import { ModalsProvider } from '../../contexts/modals';

export const TransactionsByCategory: FC<NativeStackScreenProps<StackParamList, 'TransactionsByCategory'>> = ({
  route,
  navigation,
}) => {
  const { category, month, year, categoryTitle } = route.params;
  const locale = getLocale();

  const date = format(new Date(year, month - 1, 1), 'LLLL', { locale });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: `${categoryTitle || i18n.t('transactions.emptyCategory')} (${date})`,
    });
  }, [navigation]);

  return (
    <TransactionsProvider>
      <ModalsProvider>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}>
          <TransactionsList category={category} month={month} year={year} />
        </ScrollView>
        <EditTransactionModal />
      </ModalsProvider>
    </TransactionsProvider>
  );
};
