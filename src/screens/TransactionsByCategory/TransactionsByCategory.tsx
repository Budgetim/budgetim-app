import React, { FC, useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackParamList } from '../types';
import { useUser } from '../../appContext';
import { getTransactions } from '../../api/transaction/getTransactions';
import { TransactionGroups } from '../../components/TransactionGroups';
import { Transaction } from '../../types';

export const TransactionsByCategory: FC<NativeStackScreenProps<StackParamList, 'TransactionsByCategory'>> = ({ route }) => {
  const { category } = route.params;
  const [data, setData] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const { token } = useUser();

  const getData = async () => {
    try {
      const transactions = await getTransactions({ year: 2021, month: 10, category }, token);
      setIsLoading(false);
      setData(transactions);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (error) {
    return <Text>Ошибка</Text>
  }

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  return (
    <ScrollView>
      <TransactionGroups data={data} />
    </ScrollView>
  );
};
