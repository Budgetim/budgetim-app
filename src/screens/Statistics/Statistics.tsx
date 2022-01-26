import React, { FC } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import i18n from 'i18n-js';

import { GroupList } from '../../components/GroupList';
import { StackParamList } from '../types';
import { Container } from './styled';

export const Statistics: FC<NativeStackScreenProps<StackParamList, 'Statistics'>> = ({ navigation }) => {
  return (
    <Container>
      <GroupList
        data={[
          {
            title: i18n.t('statistics.periods.title'),
            type: 'categories',
            onPress: () => navigation.navigate('StatisticsByDates'),
          },
          {
            title: i18n.t('statistics.categories.title'),
            type: 'periods',
            onPress: () => navigation.navigate('StatisticsByCategories'),
          },
        ]}
      />
    </Container>
  );
};
