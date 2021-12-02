import i18n from 'i18n-js';
import React, { FC } from 'react';
import { SectionList } from 'react-native';
import { NoDataMessage } from '../../../NoDataMessage';

import { TitleWrapper, Title } from './styled';
import { Card } from '../Card';
import { useTransactionsState } from '../../../../contexts/transactions';

export const TransactionGroups: FC = () => {
  const { dataByDate } = useTransactionsState();

  if (dataByDate.length === 0) {
    return <NoDataMessage>{i18n.t('transactions.messages.addFirst')} 👇</NoDataMessage>;
  }

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
