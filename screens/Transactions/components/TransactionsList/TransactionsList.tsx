import React, { FC, useEffect } from 'react';

import { Container } from './styled';
import { useAppDispatch, useAppState } from '../../../../appContext';
import { TransactionCard } from '../TransactionCard/TransactionCard';
import { Text } from 'react-native';
import { getTransactions } from '../../../../api/transaction/getTransactions';

export const TransactionsList: FC = () => {
  const { transactions, isLoading, error } = useAppState();
  const dispatch = useAppDispatch();

  const getData = () => {
    getTransactions((transactions) => {
      dispatch({ type: 'setData', payload: { data: transactions }});
    }, (error) => {
      dispatch({ type: 'setError', payload: { error }});
    });
  }

  useEffect(() => {
    getData();
  }, []);

  if (error) {
    return <Text>{error}</Text>
  }

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  return (
    <Container>
      {transactions.map(item => {
        return (
          <TransactionCard key={item.id} {...item} />
        );
      })}
    </Container>
  );
};