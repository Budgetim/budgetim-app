import React, { FC, useEffect } from 'react';
import format from 'date-fns/format';
import locale from 'date-fns/locale/en-US';
import { SectionList, Text } from 'react-native';

import { useAppDispatch, useTransactions, useUser } from '../../../../appContext';
import { TransactionCard } from '../TransactionCard/TransactionCard';
import { getTransactions } from '../../../../api/transaction/getTransactions';
import { Transaction } from '../../../../types';

import { TitleWrapper, Title } from './styled';

export const TransactionsList: FC = () => {
  const { data, isLoading, error } = useTransactions();
  const dispatch = useAppDispatch();
  const { token } = useUser();

  const getData = () => {
    getTransactions((transactions) => {
      dispatch({ type: 'setTransactions', payload: { data: transactions }});
    }, (error) => {
      dispatch({ type: 'setErrorTransactions', payload: { error }});
    }, token);
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

  const expandedData: { title: string, data: Transaction[] }[] = [];
  data.forEach(transaction => {
    const date = format(new Date(transaction.date), 'yyyy-MM-dd');
    const findedTransaction = expandedData.find(({ title }) => title === date)
    if (findedTransaction) {
      findedTransaction.data.push(transaction);
    } else {
      expandedData.push({ title: date, data: [transaction] });
    }
  });

  const Item = (transaction: Transaction) => (
    <TransactionCard key={transaction.id} {...transaction} />
  );

  return (
    <SectionList
      sections={expandedData}
      keyExtractor={(item, index) => item.id.toString() + index}
      renderItem={({ item }) => <Item {...item} />}
      renderSectionHeader={({ section: { title } }) => (
        <TitleWrapper>
          <Title variant="title2Bold">{format(new Date(title), 'd MMMM', { locale })}</Title>
        </TitleWrapper>
      )}
    />
  );
};