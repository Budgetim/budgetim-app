import React, { FC } from 'react';
import { ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackParamList } from '../types';
import { TransactionsProvider } from '../../constexts/transactions';
import { TransactionsList } from '../../components/TransactionsList';
import { CategoriesProvider } from '../../constexts/categories';

export const TransactionsByCategory: FC<NativeStackScreenProps<StackParamList, 'TransactionsByCategory'>> = ({ route }) => {
  const { category } = route.params;

  return (
    <TransactionsProvider>
      <CategoriesProvider>
        <ScrollView>
          <TransactionsList category={category} />
        </ScrollView>
      </CategoriesProvider>
    </TransactionsProvider>
  );
};
