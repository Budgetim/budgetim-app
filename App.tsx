import React from 'react';
import { Transactions } from './src/screens/Transactions';
import { AppProvider } from './src/appContext';
import { KeyboardAvoidingView, Platform, useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Categories } from './src/screens/Categories';
import { ThemeProvider } from 'styled-components';

import colors from './src/theme/colors';
import space from './src/theme/space';
import typography from './src/theme/typography';

const Tab = createBottomTabNavigator();

export default function App() {
  const scheme = useColorScheme();
  return (
    <ThemeProvider theme={{ colors: scheme === 'dark' ? colors.dark : colors.light, space, typography }}>
      <AppProvider>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Tab.Navigator>
              <Tab.Screen
                name="Transactions"
                component={Transactions}
                options={{
                  title: 'расходы',
                  tabBarLabelPosition: 'beside-icon',
                  tabBarLabelStyle: { fontSize: 16 },
                  tabBarIcon: ({ color }) => (
                    <FontAwesome5 name="ruble-sign" color={color} size={16} />
                  ),
                }}
              />
              <Tab.Screen
                name="Categories"
                component={Categories}
                options={{
                  title: 'категории',
                  tabBarLabelPosition: 'beside-icon',
                  tabBarLabelStyle: { fontSize: 16 },
                  tabBarIcon: ({ color }) => (
                    <FontAwesome5 name="chart-pie" color={color} size={16} />
                  ),
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </KeyboardAvoidingView>
      </AppProvider>
    </ThemeProvider>
  );
}
