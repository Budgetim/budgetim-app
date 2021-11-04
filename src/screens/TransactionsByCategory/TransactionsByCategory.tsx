import React, { FC } from 'react';
import { ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackParamList } from '../types';
import { TransactionsProvider } from '../../contexts/transactions';
import { TransactionsList } from '../../components/TransactionsList';
import { CategoriesProvider } from '../../contexts/categories';
import { EditTransactionModal } from '../../components/EditTransactionModal';

export const TransactionsByCategory: FC<NativeStackScreenProps<StackParamList, 'TransactionsByCategory'>> = ({ route }) => {
  const { category, month, year } = route.params;

  return (
    <TransactionsProvider>
      <CategoriesProvider>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}>
          <TransactionsList category={category} month={month} year={year} />
        </ScrollView>
        <EditTransactionModal />
      </CategoriesProvider>
    </TransactionsProvider>
  );
};
