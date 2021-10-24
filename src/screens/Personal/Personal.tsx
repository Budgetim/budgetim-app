import React, { FC } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';

import { StackParamList } from '../types';
import { useAppDispatch } from '../../appContext';
import { Container, Link } from './styled';
import { TouchableOpacity } from 'react-native';

export const Personal: FC<NativeStackScreenProps<StackParamList, 'Personal'>> = () => {
  const dispatch = useAppDispatch();

  const logOut = async () => {
    dispatch({ type: 'signOut' }, {});
    await SecureStore.deleteItemAsync('userToken');
  };

  return (
    <Container>
      <TouchableOpacity onPress={logOut}>
        <Link variant="bodyRegular">Выйти</Link>
      </TouchableOpacity>
    </Container>
  );
};
