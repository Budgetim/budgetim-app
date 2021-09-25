import React, { useEffect } from 'react';

import { TransactionsList } from './components/TransactionsList';
import { FormForAdding } from './components/FormForAdding';
import { Header, Title, Content } from './styled';
import { useAppDispatch } from '../../appContext';
import { getCategories } from '../../api/category/getCategories';

export const Transactions = () => {
  const dispatch = useAppDispatch();

  const getData = async () => {
    getCategories((categories) => {
      dispatch({ type: 'setCategories', payload: { data: categories }});
    });
  }

  useEffect(() => {
    getData();
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
