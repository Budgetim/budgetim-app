import React, { FC } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import i18n from 'i18n-js';

import { StackParamList } from '../types';
import { GroupList } from '../../components/GroupList';
import { useUserState } from '../../contexts/user';

import { Container, ListWrapper } from './styled';

export const Settings: FC<NativeStackScreenProps<StackParamList, 'Settings'>> = ({ navigation }) => {
  const { currency } = useUserState();

  return (
    <Container>
      <ListWrapper>
        <GroupList
          data={[
            {
              title: i18n.t('settings.personal.title'),
              type: 'person',
              onPress: () => navigation.navigate('Personal'),
            },
          ]}
        />
      </ListWrapper>
      <ListWrapper>
        <GroupList
          data={[
            {
              title: i18n.t('settings.categories.title'),
              type: 'categories',
              onPress: () => navigation.navigate('Categories'),
            },
            {
              title: i18n.t('settings.currency.title'),
              type: 'currency',
              variant: currency?.title,
              onPress: () => navigation.navigate('Currency'),
            },
          ]}
        />
      </ListWrapper>
    </Container>
  );
};
