import React, { FC } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import { TouchableOpacity } from 'react-native';

import { useAppDispatch } from '../../contexts/app';
import { GroupList } from '../../components/GroupList';

import { StackParamList } from '../types';
import { Container, Link, SignOutButton } from './styled';

export const Personal: FC<NativeStackScreenProps<StackParamList, 'Personal'>> = () => {
  const dispatch = useAppDispatch();

  const logOut = async () => {
    dispatch({ type: 'signOut' }, {});
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
