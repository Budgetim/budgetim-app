import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';

import en from '../lang/en.json';
import { useUserDispatch, useUserState } from '../contexts/user';

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
import { Loader } from '../components/Loader';
import { getUser } from '../api/user/getUser';

const Stack = createStackNavigator<StackParamList>();

export const Screens = () => {
  const [isLoading, setIsLoading] = useState(true);
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

        }
      }

      setIsLoading(false);
    };

    void bootstrapAsync();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Stack.Navigator>
      {token === null ? (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: en.login.title }}
          />
          <Stack.Screen
            name="CreateAccount"
            component={CreateAccount}
            options={{ title: en.createAccount.title }}
          />
          <Stack.Screen
            name="PasswordReset"
            component={PasswordReset}
            options={{ title: en.passwordReset.title }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Transactions"
            component={Transactions}
            options={{ title: en.transactions.title }}
          />
          <Stack.Screen
            name="Categories"
            component={Categories}
            options={{ title: en.categories.title }}
          />
          <Stack.Screen
            name="Statistics"
            component={Statistics}
            options={{ title: en.statistics.title }}
          />
          <Stack.Screen
            name="TransactionsByCategory"
            component={TransactionsByCategory}
          />

          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{ title: en.settings.title }}
          />
          <Stack.Screen
            name="Personal"
            component={Personal}
            options={{ title: en.settings.personal.title }}
          />
          <Stack.Screen
            name="Currency"
            component={Currency}
            options={{ title: en.settings.currency.title }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
