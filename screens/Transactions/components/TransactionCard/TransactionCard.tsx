import React, { FC, useState } from 'react';
import format from 'date-fns/format';
import { SwipeItem, SwipeButtonsContainer } from 'react-native-swipe-item';

import { Transaction } from '../../../../types';

import { Card, Info } from './styled';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TransactionModal } from '../TransactionModal/TransactionModal';
import { useAppDispatch } from '../../../../appContext';

export const TransactionCard: FC<Transaction> = (props) => {
  const { title, category, price, date, id} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useAppDispatch();

  const onDelete = async () => {
    try {
      const response = await fetch('https://api.budgetim.ru/transaction/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      });

      if (response.ok) {
        dispatch({ type: 'deleteTransaction', payload: { id }});
      }
    } catch (error) {
    } finally {
    }
  }

  const rightButton = (
    <SwipeButtonsContainer
      style={{
        aspectRatio: 1,
        height: '100%',
      }}
    >
      <TouchableOpacity
        onPress={onDelete}
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: 'red',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>удалить</Text>
      </TouchableOpacity>
    </SwipeButtonsContainer>
  );

  return (
    <SwipeItem
      style={styles.button}
      swipeContainerStyle={styles.swipeContentContainerStyle}
      rightButtons={rightButton}
      disableSwipeIfNoButton
    >
      <Card onPress={() => setModalVisible(true)}>
        <Info>
          <Text style={{ fontSize: 16, marginBottom: 4 }}>{title}</Text>
          <Text style={{ fontSize: 16, color: '#939393', marginBottom: 4 }}>{category}</Text>
          <Text style={{ fontSize: 16, color: '#939393' }}>{format(new Date(date), 'dd MMM')}</Text>
        </Info>
        <Text style={{ fontSize: 16 }}>{price}</Text>
        <TransactionModal {...props} visible={modalVisible} setVisible={setModalVisible} />
      </Card>
    </SwipeItem>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 94,
  },
  swipeContentContainerStyle: {
    backgroundColor: '#fff',
  }
});