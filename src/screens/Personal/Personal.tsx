import React, { FC } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import { TouchableOpacity } from 'react-native';

import { useUserDispatch } from '../../contexts/user';
import { GroupList } from '../../components/GroupList';

import { StackParamList } from '../types';
import { Container, Link, SignOutButton } from './styled';

export const Personal: FC<NativeStackScreenProps<StackParamList, 'Personal'>> = () => {
  const dispatch = useUserDispatch();

  const logOut = async () => {
    dispatch({ type: 'setToken', payload: { token: null } });
    await SecureStore.deleteItemAsync('userToken');
  };

  return (
    <Container>
      <GroupList
        data={[
          {
            title: 'Change password',
            onPress: () => {},
          },
        ]}
      />
      <SignOutButton onPress={logOut}>
        <Link variant="bodyRegular">Sign out</Link>
      </SignOutButton>
    </Container>
  );
};
