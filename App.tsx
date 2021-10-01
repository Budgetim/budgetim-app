import React from 'react';
import { Transactions } from './src/screens/Transactions';
import { AppProvider } from './src/appContext';
import { KeyboardAvoidingView, Platform, useColorScheme } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Categories } from './src/screens/Categories';
import { ThemeProvider } from 'styled-components';

import colors from './src/theme/colors';
import space from './src/theme/space';
import typography from './src/theme/typography';
import { Login } from './src/screens/Login';
import { CreateAccount } from './src/screens/CreateAccount';
import { Settings } from './src/screens/Settings';

const Stack = createStackNavigator();

export default function App() {
  const scheme = useColorScheme();
  return (
    <ThemeProvider theme={{ colors: scheme === 'dark' ? colors.dark : colors.light, space, typography }}>
      <AppProvider>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack.Navigator>
              <Stack.Screen
                name="Transactions"
                component={Transactions}
                options={{ title: 'Transactions' }}
              />
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
                name="Categories"
                component={Categories}
                options={{ title: 'Categories' }}
              />
              <Stack.Screen
                name="Settings"
                component={Settings}
                options={{ title: 'Settings' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </KeyboardAvoidingView>
      </AppProvider>
    </ThemeProvider>
  );
};
