import React, { FC, useEffect } from 'react';

import { Container } from './styled';
import { useAppDispatch, useAppState } from '../../../../appContext';
import { TransactionCard } from '../TransactionCard/TransactionCard';
import { Text } from 'react-native';

export const TransactionsList: FC = () => {
  const { transactions, isLoading, error } = useAppState();
  const dispatch = useAppDispatch();

  const getTransactions = async () => {
    try {
      const response = await fetch('https://api.budgetim.ru/transaction');
      const json = await response.json();
      dispatch({ type: 'setData', payload: { data: json }});
    } catch (error) {
      dispatch({ type: 'setError', payload: { error }});
    }
  }

  useEffect(() => {
    getTransactions();
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
          <TransactionCard key={item._id} {...item} />
        );
      })}
    </Container>
  );
};