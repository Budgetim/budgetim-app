import React, { FC, useState } from 'react';
import { TextInput, View } from 'react-native';
import { useAppDispatch } from '../../appContext';

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
          description: 'test description',
          category: 'test category',
          price: 123,
        }),
      });
      setText('');

      // if (response.ok) {
      //   dispatch({ type: 'deleteTransaction', payload: { id: _id }});
      // }
    } catch (error) {
    } finally {
    }
  }

  return (
    <View>
      <TextInput
        placeholder="Добавить"
        onChangeText={setText}
        onEndEditing={onAdd}
        defaultValue={text}
      />
    </View>
  );
}