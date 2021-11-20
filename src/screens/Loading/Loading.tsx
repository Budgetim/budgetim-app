import React, { FC } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../types';

import { Loader } from '../../components/Loader';

export const Loading: FC<NativeStackScreenProps<StackParamList, 'Loading'>> = () => {
  return (
    <Loader />
  );
};
