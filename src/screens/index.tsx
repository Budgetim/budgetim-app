import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import i18n from 'i18n-js';
import { StatisticsByDates } from './StatisticsByDates';
import { Transactions } from './Transactions';
import { Categories } from './Categories';
import { StackParamList } from './types';
import { TransactionsByCategory } from './TransactionsByCategory';
import { Settings } from './Settings';

const Stack = createStackNavigator<StackParamList>();
export const Screens = () => (
  <Stack.Navigator>
    <Stack.Screen name="Transactions" component={Transactions} options={{ title: i18n.t('transactions.title') }} />
    <Stack.Screen name="Settings" component={Settings} options={{ title: i18n.t('settings.title') }} />
    <Stack.Screen name="Categories" component={Categories} options={{ title: i18n.t('categories.title') }} />
    <Stack.Screen
      name="StatisticsByDates"
      component={StatisticsByDates}
      options={{ title: i18n.t('statistics.title') }}
    />
    <Stack.Screen name="TransactionsByCategory" component={TransactionsByCategory} />
  </Stack.Navigator>
);
