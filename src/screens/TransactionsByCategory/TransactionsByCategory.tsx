import i18n from 'i18n-js';
import React, { FC } from 'react';
import { ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import format from 'date-fns/format';
import { getLocale } from '../../utils/getLocale';

import { StackParamList } from '../types';
import { TransactionsList } from '../../components/TransactionsList';

export const TransactionsByCategory: FC<NativeStackScreenProps<StackParamList, 'TransactionsByCategory'>> = ({
  route,
  navigation,
}) => {
  const { category, month, year, categoryTitle } = route.params;
  const locale = getLocale();

  const date = format(new Date(year, month - 1, 1), 'LLLL', { locale });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: `${categoryTitle || i18n.t('transactions.emptyTitle')} (${date})`,
    });
  }, [navigation]);

  return (
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}>
      <TransactionsList category={category} month={month} year={year} />
    </ScrollView>
  );
};
