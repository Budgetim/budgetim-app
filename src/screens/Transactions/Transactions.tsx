import React, { useEffect } from 'react';

import { TransactionsList } from './components/TransactionsList';
import { useAppDispatch } from '../../appContext';
import { getCategories } from '../../api/category/getCategories';
import { Button, ScrollView } from 'react-native';
import { addTransaction } from '../../api/transaction/addTransaction';

export const Transactions = ({ navigation }: any) => {
  const dispatch = useAppDispatch();

  const onAdd = () => {
    addTransaction(
      { title: '' },
      (transaction) => {
        dispatch({ type: 'addTransaction', payload: transaction });
      },
    );
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={onAdd} title="добавить" />
      ),
    });
  }, [navigation]);

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
      <TransactionsList />
    </ScrollView>
  );
};
