import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';
import i18n from 'i18n-js';

import { useUserDispatch, useUserState } from '../contexts/user';

import { Transactions } from './Transactions';
import { Categories } from './Categories';
import { Settings } from './Settings';
import { Login } from './Login';
import { CreateAccount } from './CreateAccount';
import { StackParamList } from './types';
import { Statistics } from './Statistics';
import { Personal } from './Personal';
import { Loading } from './Loading';
import { Error } from './Error';
import { TransactionsByCategory } from './TransactionsByCategory';
import { PasswordReset } from './PasswordReset';
import { Currency } from './Currency';
import { getUser } from '../api/user/getUser';

const Stack = createStackNavigator<StackParamList>();

export const Screens = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useUserState();
  const dispatch = useUserDispatch();

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (error) {
        // Restoring token failed
      }

      if (userToken) {
        try {
          const user = await getUser(userToken);
          dispatch({
            type: 'setUser',
            payload: {
              user: {
                ...user,
                token: userToken,
              },
            }
          });
        } catch (error) {
          setError('error');
        }
      }

      setIsLoading(false);
    };

    void bootstrapAsync();
  }, []);

  let screens;

  if (isLoading) {
    screens = (
      <Stack.Screen
        name="Loading"
        component={Loading}
        options={{ headerShown: false }}
      />
    )
  } else if (error) {
    screens = (
      <Stack.Screen
        name="Error"
        component={Error}
        options={{ title: i18n.t('common.state.error') }}
      />
    )
  } else if (token === null) {
    screens = (
      <>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: i18n.t('login.title') }}
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{ title: i18n.t('createAccount.title') }}
        />
        <Stack.Screen
          name="PasswordReset"
          component={PasswordReset}
          options={{ title: i18n.t('passwordReset.title') }}
        />
      </>
    );
  } else {
    screens = (
      <>
        <Stack.Screen
          name="Transactions"
          component={Transactions}
          options={{ title: i18n.t('transactions.title') }}
        />
        <Stack.Screen
          name="Categories"
          component={Categories}
          options={{ title: i18n.t('categories.title') }}
        />
        <Stack.Screen
          name="Statistics"
          component={Statistics}
          options={{ title: i18n.t('statistics.title') }}
        />
        <Stack.Screen
          name="TransactionsByCategory"
          component={TransactionsByCategory}
        />

        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ title: i18n.t('settings.title') }}
        />
        <Stack.Screen
          name="Personal"
          component={Personal}
          options={{ title: i18n.t('settings.general.title') }}
        />
        <Stack.Screen
          name="Currency"
          component={Currency}
          options={{ title: i18n.t('settings.currency.title') }}
        />
      </>
    );
  }

  return <Stack.Navigator>{screens}</Stack.Navigator>;
};
