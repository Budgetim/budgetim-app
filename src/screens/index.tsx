import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { useUser } from '../appContext';

import { Transactions } from './Transactions';
import { Categories } from './Categories';
import { Settings } from './Settings';
import { Login } from './Login';
import { CreateAccount } from './CreateAccount';
import { StackParamList } from './types';

const Stack = createStackNavigator<StackParamList>();

export const Screens = () => {
  const { token } = useUser();

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
            name="Settings"
            component={Settings}
            options={{ title: 'Settings' }}
          />
        </>
      )}
    </Stack.Navigator>
  )
};
