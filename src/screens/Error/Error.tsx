import React, { FC } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';

import { StackParamList } from '../types';
import { TextVariant } from '../../components/TextVariant';

export const Error: FC<NativeStackScreenProps<StackParamList, 'Loading'>> = () => {
  return (
    <View>
      <TextVariant variant="bodyRegular">Сервис временно недоступен</TextVariant>
    </View>
  );
};
