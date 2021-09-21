import React, { FC, useState } from 'react';
import { TextInput } from 'react-native';
import { useAppDispatch } from '../../appContext';

import { Card } from './styled';

export const FormForAdding: FC = () => {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  const onAdd = async () => {
    try {
      const response = await fetch('https://api.budgetim.ru/transaction/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: text,
          category: 't',
          price: 1,
        }),
      });
      const transaction = await response.json();
      dispatch({ type: 'addTransaction', payload: transaction});
      setText('');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card>
      <TextInput
        placeholder="Добавить"
        onChangeText={setText}
        onEndEditing={onAdd}
        defaultValue={text}
        style={{ fontSize: 16 }}
      />
    </Card>
  );
}