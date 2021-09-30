import React, { useEffect } from 'react';

import { TransactionsList } from './components/TransactionsList';
import { FormForAdding } from './components/FormForAdding';
import { useAppDispatch } from '../../appContext';
import { getCategories } from '../../api/category/getCategories';
import { ScrollView } from 'react-native';

export const Transactions = () => {
  const dispatch = useAppDispatch();

  const getData = async () => {
    getCategories((categories) => {
      dispatch({ type: 'setCategories', payload: { data: categories }});
    }, (error) => {
      dispatch({ type: 'setErrorCategories', payload: { error }});
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView>
      <FormForAdding />
      <TransactionsList />
    </ScrollView>
  );
};
