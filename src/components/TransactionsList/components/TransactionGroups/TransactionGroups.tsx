import React, { FC } from 'react';
import { SectionList } from 'react-native';

import { TitleWrapper, Title } from './styled';
import { Card } from '../Card';
import { useTransactionsState } from '../../../../contexts/transactions';

export const TransactionGroups: FC = () => {
  const { dataByDate } = useTransactionsState();

  return (
    <SectionList
      sections={dataByDate}
      keyExtractor={(item) => `${item.id}`}
      renderItem={({ item }) => <Card {...item} />}
      renderSectionHeader={({ section: { title } }) => (
        <TitleWrapper>
          <Title variant="title2Bold">{title}</Title>
        </TitleWrapper>
      )}
    />
  );
};