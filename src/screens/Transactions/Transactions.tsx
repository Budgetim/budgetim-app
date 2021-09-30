import React, { useEffect, useState } from 'react';

import { TransactionsList } from './components/TransactionsList';
import { useAppDispatch } from '../../appContext';
import { getCategories } from '../../api/category/getCategories';
import { Button, ScrollView } from 'react-native';
import { TransactionModal } from './components/TransactionModal/TransactionModal';

export const Transactions = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setModalVisible(true)} title="добавить" />
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
      <TransactionModal
        transaction={{ title: '', category: null, price: '0.00', date: null }}
        visible={modalVisible}
        setVisible={setModalVisible}
      />
    </ScrollView>
  );
};
