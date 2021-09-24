import React, { useEffect } from 'react';

import { TransactionsList } from './components/TransactionsList';
import { FormForAdding } from './components/FormForAdding';
import { Header, Title, Content } from './styled';
import { useAppDispatch } from '../../appContext';

export const Transactions = () => {
  const dispatch = useAppDispatch();

  const getCategories = async () => {
    const response = await fetch('https://api.budgetim.ru/categories');
    const json = await response.json();
    dispatch({ type: 'setCategories', payload: { data: json }});
  }

  useEffect(() => {
    getCategories();
  }, []);

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
