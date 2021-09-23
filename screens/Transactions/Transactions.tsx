import React from 'react';

import { TransactionsList } from './components/TransactionsList';
import { FormForAdding } from './components/FormForAdding';
import { Header, Title, Content } from './styled';

export const Transactions = () => {
  return (
    <>
      <Header>
        <Title>расходы</Title>
      </Header>
      <Content>
        <TransactionsList />
        <FormForAdding />
      </Content>
    </>
  );
};
