import React, { FC } from 'react';
import format from 'date-fns/format';
import locale from 'date-fns/locale/en-US';
import { SectionList } from 'react-native';

import { TitleWrapper, Title } from './styled';
import { TransactionGroupsProps } from './types';
import { TransactionCard } from '../TransactionCard';
import { Transaction } from '../../types';

export const TransactionGroups: FC<TransactionGroupsProps> = ({ data }) => {
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
      keyExtractor={(item, index) => `${item.id}${index}`}
      renderItem={({ item }) => <Item {...item} />}
      renderSectionHeader={({ section: { title } }) => (
        <TitleWrapper>
          <Title variant="title2Bold">{format(new Date(title), 'd MMMM', { locale })}</Title>
        </TitleWrapper>
      )}
    />
  );
};