import React, { FC, useEffect } from 'react';

import { Container } from './styled';
import { useAppDispatch, useAppState } from '../../../../appContext';
import { TransactionCard } from '../TransactionCard/TransactionCard';
import { Text } from 'react-native';
import { getTransactions } from '../../../../api/transaction/getTransactions';

export const TransactionsList: FC = () => {
  const { transactions, isLoadingTransactions, errorTransactions } = useAppState();
  const dispatch = useAppDispatch();

  const getData = () => {
    getTransactions((transactions) => {
      dispatch({ type: 'setTransactions', payload: { data: transactions }});
    }, (error) => {
      dispatch({ type: 'setErrorTransactions', payload: { error }});
    });
  }

  useEffect(() => {
    getData();
  }, []);

  if (errorTransactions) {
    return <Text>{errorTransactions}</Text>
  }

  if (isLoadingTransactions) {
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