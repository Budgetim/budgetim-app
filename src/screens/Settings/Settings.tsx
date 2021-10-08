import React, { FC } from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';

import { StackParamList } from '../types';
import { useAppDispatch } from '../../appContext';

import { Item } from './styled';

export const Settings: FC<NativeStackScreenProps<StackParamList, 'Settings'>> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const logOut = async () => {
    dispatch({ type: 'signOut' }, {});
    await SecureStore.deleteItemAsync('userToken');
  };

  return (
    <View style={{ paddingLeft: 16, paddingTop: 40 }}>
      <Item variant="bodyRegular" onPress={() => navigation.navigate('Categories')}>Categories</Item>
      <Item variant="bodyRegular" onPress={logOut}>Выйти</Item>
    </View>
  );
};
