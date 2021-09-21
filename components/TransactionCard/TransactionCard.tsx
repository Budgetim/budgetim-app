import React, { FC } from 'react';
import { SwipeItem, SwipeButtonsContainer } from 'react-native-swipe-item';

import { Transaction } from '../../types';

import { Card, Info, Title, Category, Price } from './styled';
import { Text, TouchableOpacity } from 'react-native';
import { useAppDispatch } from '../../appContext';

export const TransactionCard: FC<Transaction> = (props) => {
  const { _id, title, price, category } = props;
  const dispatch = useAppDispatch();

  const onDelete = async () => {
    try {
      const response = await fetch('https://api.budgetim.ru/transaction/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: _id,
        }),
      });

      if (response.ok) {
        dispatch({ type: 'deleteTransaction', payload: { id: _id }});
      }
    } catch (error) {
    } finally {
    }
  }

  const rightButton = (
    <SwipeButtonsContainer
      style={{
        alignSelf: 'center',
        aspectRatio: 1,
        flexDirection: 'column',
        padding: 10,
        backgroundColor: 'red',
      }}
    >
      <TouchableOpacity
        onPress={() => {
          onDelete();
        }}
      >
        <Text>delete</Text>
      </TouchableOpacity>
    </SwipeButtonsContainer>
  );

  return (
    <SwipeItem
      style={{
        height: 70,
        alignSelf: 'center',
        marginVertical: 5,
      }}
      swipeContainerStyle={{
        backgroundColor: '#fff',
      }}
      rightButtons={rightButton}
    >
      <Card>
        <Info>
          <Title>{title} {_id}</Title>
          <Category>{category}</Category>
        </Info>
        <Price>{price} руб.</Price>
      </Card>
    </SwipeItem>
  );
}