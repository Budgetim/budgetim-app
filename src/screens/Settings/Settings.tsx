import React, { FC } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../types';
import { Container } from './styled';
import { CategoriesList } from './components/CategoriesList';
import { CategoryModal } from '../../modals/CategoryModal';

export const Settings: FC<NativeStackScreenProps<StackParamList, 'Settings'>> = () => {
  return (
    <Container>
      <CategoriesList />
      <CategoryModal />
    </Container>
  );
};
