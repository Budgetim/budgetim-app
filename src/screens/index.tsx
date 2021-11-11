import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';

import { useAppDispatch, useUser } from '../contexts/app';

import { Transactions } from './Transactions';
import { Categories } from './Categories';
import { Settings } from './Settings';
import { Login } from './Login';
import { CreateAccount } from './CreateAccount';
import { StackParamList } from './types';
import { Statistics } from './Statistics';
import { Personal } from './Personal';
import { TransactionsByCategory } from './TransactionsByCategory';
import { PasswordReset } from './PasswordReset';
import { Currency } from './Currency';

const Stack = createStackNavigator<StackParamList>();

export const Screens = () => {
  const user = useUser();
  const { token } = user;

  const dispatch = useAppDispatch();

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (error) {
        // Restoring token failed
      }

      if (userToken) {
        dispatch({ type: 'restoreToken', payload: { token: userToken } });
      }
    };

    void bootstrapAsync();
  }, []);

  return (
    <Stack.Navigator>
      {token === null ? (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: 'Login' }}
          />
          <Stack.Screen
            name="CreateAccount"
            component={CreateAccount}
            options={{ title: 'Create account' }}
          />
          <Stack.Screen
            name="PasswordReset"
            component={PasswordReset}
            options={{ title: 'Password reset' }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Transactions"
            component={Transactions}
            options={{ title: 'Transactions' }}
          />
          <Stack.Screen
            name="Categories"
            component={Categories}
            options={{ title: 'Categories' }}
          />
          <Stack.Screen
            name="Statistics"
            component={Statistics}
            options={{ title: 'Statistics' }}
          />
          <Stack.Screen
            name="TransactionsByCategory"
            component={TransactionsByCategory}
            options={{ title: 'TransactionsByCategory' }}
          />

          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{ title: 'Settings' }}
          />
          <Stack.Screen
            name="Personal"
            component={Personal}
            options={{ title: 'Personal' }}
          />
          <Stack.Screen
            name="Currency"
            component={Currency}
            options={{ title: 'Currency' }}
          />
        </>
      )}
    </Stack.Navigator>
  )
};
