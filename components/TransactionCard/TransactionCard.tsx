import React, { FC, useState } from 'react';
import { SwipeItem, SwipeButtonsContainer } from 'react-native-swipe-item';

import { Transaction } from '../../types';

import { Card, Info } from './styled';
import { Text, TextInput, TouchableOpacity } from 'react-native';
import { useAppDispatch } from '../../appContext';

export const TransactionCard: FC<Transaction> = (props) => {
  const { _id } = props;
  const [title, setTitle] = useState(props.title);
  const [price, setPrice] = useState(props.price);
  const [category, setCategory] = useState(props.category);
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

  const onEdit = async () => {
    try {
      const response = await fetch('https://api.budgetim.ru/transaction/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: _id,
          title,
          category,
          price,
        }),
      });
      const transaction = await response.json();
      dispatch({ type: 'editTransaction', payload: transaction});
    } catch (error) {
      console.log(error);
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
        onPress={onDelete}
      >
        <Text>delete</Text>
      </TouchableOpacity>
    </SwipeButtonsContainer>
  );

  return (
    <SwipeItem
      style={{
        height: 60,
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
          <TextInput
            defaultValue={title}
            onChangeText={setTitle}
            onEndEditing={onEdit}
            style={{ fontSize: 20 }}
          />
          <TextInput
            defaultValue={category}
            onChangeText={setCategory}
            onEndEditing={onEdit}
            style={{ fontSize: 16, color: '#939393' }}
          />
        </Info>
        <TextInput
          defaultValue={price.toString()}
          onChangeText={price => setPrice(+price)}
          onEndEditing={onEdit}
          style={{ fontSize: 20 }}
        />
      </Card>
    </SwipeItem>
  );
}