import React, { FC, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as InAppPurchases from 'expo-in-app-purchases';
import { StackParamList } from '../types';

import { Container } from './styled';

export const IAP: FC<NativeStackScreenProps<StackParamList, 'IAP'>> = () => {
  const getProducts = async () => {
    //await InAppPurchases.connectAsync();
    //const res = await InAppPurchases.getProductsAsync(['AD335DGA3GEB']);
    //console.log(res);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return <Container></Container>;
};
