import React, { useEffect, useState } from 'react';
import { TransactionsList } from './components/TransactionsList';
import { Button, ScrollView } from 'react-native';
import { TransactionModal } from './components/TransactionModal/TransactionModal';
import { getCategories } from '../../api/category/getCategories';
import { useAppDispatch } from '../../appContext';

export const Transactions = ({ navigation }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useAppDispatch();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setModalVisible(true)} title="Добавить" />
      ),
      headerLeft: () => (
        <Button onPress={() => navigation.navigate('Login')} title="Войти" />
      )
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
      <TransactionModal
        transaction={{ title: '', category: null, price: '0.00', date: null }}
        visible={modalVisible}
        setVisible={setModalVisible}
      />
    </ScrollView>
  );
};
