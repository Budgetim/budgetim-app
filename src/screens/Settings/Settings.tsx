import React, { FC } from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackParamList } from '../types';

import { Item } from './styled';

export const Settings: FC<NativeStackScreenProps<StackParamList, 'Settings'>> = ({ navigation }) => {
  return (
    <View style={{ paddingLeft: 16, paddingTop: 40 }}>
      <Item variant="bodyRegular" onPress={() => navigation.navigate('Categories')}>Categories</Item>
    </View>
  );
};
