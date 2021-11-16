import React, { FC } from 'react';
import { SectionList, View } from 'react-native';

import { TitleWrapper, Title } from './styled';
import { Card } from '../Card';
import { useTransactionsState } from '../../../../contexts/transactions';
import { TextVariant } from '../../../TextVariant';

export const TransactionGroups: FC = () => {
  const { dataByDate } = useTransactionsState();

  if (dataByDate.length === 0) {
    // TODO: заглушка
    return (
      <View>
        <TextVariant variant="bodyRegular">Add first transaction</TextVariant>
      </View>
    )
  }

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