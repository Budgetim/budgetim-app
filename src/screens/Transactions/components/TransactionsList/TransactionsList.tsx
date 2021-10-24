import React, { FC, useEffect } from 'react';
import { Text } from 'react-native';

import { useAppDispatch, useTransactions, useUser } from '../../../../appContext';
import { getTransactions } from '../../../../api/transaction/getTransactions';
import { TransactionGroups } from '../../../../components/TransactionGroups';

export const TransactionsList: FC = () => {
  const { data, isLoading, error } = useTransactions();
  const dispatch = useAppDispatch();
  const { token } = useUser();

  const getData = () => {
    getTransactions({ year: 2021, month: 10 }, (transactions) => {
      dispatch({ type: 'setTransactions', payload: { data: transactions }});
    }, (error) => {
      dispatch({ type: 'setErrorTransactions', payload: { error }});
    }, token);
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
    <TransactionGroups data={data} />
  );
};