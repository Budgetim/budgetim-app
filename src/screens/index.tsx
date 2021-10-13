import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';

import { useAppDispatch, useUser } from '../appContext';

import { Transactions } from './Transactions';
import { Categories } from './Categories';
import { Settings } from './Settings';
import { Login } from './Login';
import { CreateAccount } from './CreateAccount';
import { StackParamList } from './types';
import { Statistics } from './Statistics';

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
      } catch (e) {
        // Restoring token failed
      }

      if (userToken) {
        dispatch({ type: 'restoreToken', payload: { token: userToken } });
      }
    };

    bootstrapAsync();
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
            name="Settings"
            component={Settings}
            options={{ title: 'Settings' }}
          />
        </>
      )}
    </Stack.Navigator>
  )
};
