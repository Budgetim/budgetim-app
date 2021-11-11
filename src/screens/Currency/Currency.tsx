import React, { FC, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackParamList } from '../types';
import { Container } from './styled';
import { SelectList } from '../../components/SelectList';

export const Currency: FC<NativeStackScreenProps<StackParamList, 'Currency'>> = () => {
  const [currentId, setCurrentId] = useState(0);

  return (
    <Container>
      <SelectList
        onSelect={(id) => setCurrentId(id)}
        data={[
          {
            id: 0,
            title: 'USD',
            isActive: 0 === currentId,
          },
          {
            id: 1,
            title: 'Rub',
            isActive: 1 === currentId,
          },
        ]}
      />
    </Container>
  );
};
