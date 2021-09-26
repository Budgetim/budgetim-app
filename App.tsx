import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Transactions } from './screens/Transactions';
import { Home } from './screens/Home';
import { AppProvider } from './appContext';
import { Categories } from './screens/Categories';
import { KeyboardAvoidingView, Platform } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{ title: 'главная' }} />
            <Stack.Screen name="Transactions" component={Transactions} options={{ title: 'расходы' }} />
            <Stack.Screen name="Categories" component={Categories} options={{ title: 'категории' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </KeyboardAvoidingView>
    </AppProvider>
  );
}
