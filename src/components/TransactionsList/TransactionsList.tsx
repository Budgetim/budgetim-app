import React, { FC } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Loader } from '../Loader';
import { ErrorMessage } from '../ErrorMessage';
import { NoDataMessage } from '../NoDataMessage';
import i18n from 'i18n-js';
import { SectionList } from 'react-native';
import { Card } from './components/Card';
import { Title, TitleWrapper } from './styled';
import { Transaction } from '../../types';
import { getLocale } from '../../utils/getLocale';
import format from 'date-fns/format';
import compareDesc from 'date-fns/compareDesc';
import { useGetTransactions } from '../../hooks/transactions';

const currentYear = new Date().getFullYear();

export const expandData = (data: Transaction[]) => {
  const expandedData: { title: string; date: Date; data: Transaction[] }[] = [];
  const locale = getLocale();

  data.forEach(transaction => {
    const currentDate = new Date(transaction.date);
    const formatDate = currentDate.getFullYear() === currentYear ? 'd MMMM' : 'd MMMM yyyy';
    const date = format(currentDate, formatDate, { locale });
    const foundedTransaction = expandedData.find(({ title }) => title === date);
    if (foundedTransaction) {
      foundedTransaction.data.push(transaction);
    } else {
      expandedData.push({ title: date, date: new Date(transaction.date), data: [transaction] });
    }
  });

  expandedData.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return expandedData.map(group => {
    return {
      title: group.title,
      data: group.data.sort((a, b) => a.id - b.id),
    };
  });
};

interface TransactionsListProps {
  category?: number;
  month?: number;
  year?: number;
}

export const TransactionsList: FC<TransactionsListProps> = ({ category, month, year }) => {
  const isFocused = useIsFocused();

  const { isLoading, error, data } = useGetTransactions({ category, month, year });

  if (!isFocused) {
    return null;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (data.length === 0) {
    return <NoDataMessage>{i18n.t('transactions.messages.addFirst')} ?</NoDataMessage>;
  }

  const dataByDate = expandData(data);

  return (
    <SectionList
      sections={dataByDate}
      keyExtractor={item => `${item.id}`}
      renderItem={({ item }) => <Card {...item} />}
      renderSectionHeader={({ section: { title } }) => (
        <TitleWrapper>
          <Title variant="title2Bold">{title}</Title>
        </TitleWrapper>
      )}
    />
  );
};
