import React, { FC } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackParamList } from '../types';
import { Container } from './styled';
import { GroupList } from '../../components/GroupList';

export const Settings: FC<NativeStackScreenProps<StackParamList, 'Settings'>> = ({ navigation }) => {
  return (
    <Container>
      <GroupList
        data={[
          {
            title: 'Categories',
            onPress: () => navigation.navigate('Categories'),
          },
          {
            title: 'Personal',
            onPress: () => navigation.navigate('Personal'),
          },
        ]}
      />
    </Container>
  );
};
