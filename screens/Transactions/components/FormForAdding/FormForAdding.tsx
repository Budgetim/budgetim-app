import React, { FC, useState } from 'react';
import { TextInput } from 'react-native';

import { useAppDispatch } from '../../../../appContext';
import { add } from '../../../../api/transaction/add';

import { Card } from './styled';

export const FormForAdding: FC = () => {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  const onAdd = () => {
    add(
      { title: text },
      (transaction) => {
        dispatch({ type: 'addTransaction', payload: transaction});
        setText('');
      }
    );
  };

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
};
