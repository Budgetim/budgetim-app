import React, { FC } from 'react';
import { ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackParamList } from '../types';
import { TransactionsProvider } from '../../contexts/transactions';
import { TransactionsList } from '../../components/TransactionsList';
import { CategoriesProvider } from '../../contexts/categories';

export const TransactionsByCategory: FC<NativeStackScreenProps<StackParamList, 'TransactionsByCategory'>> = ({ route }) => {
  const { category } = route.params;

  return (
    <TransactionsProvider>
      <CategoriesProvider>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}>
          <TransactionsList category={category} month={10} />
        </ScrollView>
      </CategoriesProvider>
    </TransactionsProvider>
  );
};
