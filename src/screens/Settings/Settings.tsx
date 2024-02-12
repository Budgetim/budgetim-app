import React, { FC } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../types';
import { GroupList } from '../../components/GroupList';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import { Container } from './styled';

export const Settings: FC<NativeStackScreenProps<StackParamList, 'Settings'>> = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <GroupList
        data={[
          {
            title: i18n.t('settings.categories.title'),
            onPress: () => navigation.navigate('Categories'),
            type: 'categories',
          },
          {
            title: i18n.t('settings.currency.title'),
            onPress: () => navigation.navigate('Currency'),
            type: 'currency',
          },
        ]}
      />
    </Container>
  );
};
