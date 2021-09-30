import React, { FC, useEffect } from 'react';
import format from 'date-fns/format';

import { TitleWrapper, Title } from './styled';
import { useAppDispatch, useAppState } from '../../../../appContext';
import { TransactionCard } from '../TransactionCard/TransactionCard';
import { SectionList, Text } from 'react-native';
import { getTransactions } from '../../../../api/transaction/getTransactions';
import { Transaction } from '../../../../types';

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

  const data: { title: string, data: Transaction[] }[] = [];
  transactions.forEach(transaction => {
    const date = format(new Date(transaction.date), 'yyyy-MM-dd');
    const findedTransaction = data.find(({ title }) => title === date)
    if (findedTransaction) {
      findedTransaction.data.push(transaction);
    } else {
      data.push({ title: date, data: [transaction] });
    }
  });

  const Item = (transaction: Transaction) => (
    <TransactionCard key={transaction.id} {...transaction} />
  );

  return (
    <SectionList
      sections={data}
      keyExtractor={(item, index) => item.id.toString() + index}
      renderItem={({ item }) => <Item {...item} />}
      renderSectionHeader={({ section: { title } }) => (
        <TitleWrapper>
          <Title variant="title2Bold">{format(new Date(title), 'dd MMMM')}</Title>
        </TitleWrapper>
      )}
    />
  );
};