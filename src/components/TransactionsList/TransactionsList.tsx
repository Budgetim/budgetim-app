import React, { FC } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useTransactionsState } from '../../contexts/transactions';
import { Loader } from '../Loader';
import { ErrorMessage } from '../ErrorMessage';
import { NoDataMessage } from '../NoDataMessage';
import i18n from 'i18n-js';
import { expandData } from '../../contexts/transactions/transactionsReducer';
import { SectionList } from 'react-native';
import { Card } from './components/Card';
import { Title, TitleWrapper } from './styled';

export const TransactionsList: FC = () => {
  const isFocused = useIsFocused();
  const { data, error, isLoading } = useTransactionsState();

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
