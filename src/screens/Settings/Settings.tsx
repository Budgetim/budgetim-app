import React, { FC } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../types';
import { Container, Item } from './styled';
import { CategoriesList } from './components/CategoriesList';
import { CategoryModal } from '../../modals/CategoryModal';
import { CurrencyModal } from '../../modals/CurrencyModal';
import { CurrenciesList } from './components/CurrenciesList';

export const Settings: FC<NativeStackScreenProps<StackParamList, 'Settings'>> = () => {
  return (
    <Container>
      <Item>
        <CategoriesList />
      </Item>
      <Item>
        <CurrenciesList />
      </Item>
      <CategoryModal />
      <CurrencyModal />
    </Container>
  );
};
