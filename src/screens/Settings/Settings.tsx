import React, { FC } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackParamList } from '../types';
import { Container, ListWrapper } from './styled';
import { GroupList } from '../../components/GroupList';
import { useUserState } from '../../contexts/user';

export const Settings: FC<NativeStackScreenProps<StackParamList, 'Settings'>> = ({ navigation }) => {
  const { currency } = useUserState();

  return (
    <Container>
      <ListWrapper>
        <GroupList
          data={[
            {
              title: 'Personal',
              type: 'person',
              onPress: () => navigation.navigate('Personal'),
            },
          ]}
        />
      </ListWrapper>
      <ListWrapper>
        <GroupList
          data={[
            {
              title: 'Categories',
              type: 'categories',
              onPress: () => navigation.navigate('Categories'),
            },
            {
              title: 'Currency',
              type: 'currency',
              variant: currency?.title,
              onPress: () => navigation.navigate('Currency'),
            },
          ]}
        />
      </ListWrapper>
    </Container>
  );
};
