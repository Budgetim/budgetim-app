import React from 'react';
import { KeyboardAvoidingView, Platform, useColorScheme } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';

import { AppProvider } from './src/appContext';
import colors from './src/theme/colors';
import space from './src/theme/space';
import typography from './src/theme/typography';
import { Screens } from './src/screens';

const Stack = createStackNavigator();

export default function App() {
  const scheme = useColorScheme();
  return (
    <ThemeProvider theme={{ colors: scheme === 'dark' ? colors.dark : colors.light, space, typography }}>
      <AppProvider>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Screens />
          </NavigationContainer>
        </KeyboardAvoidingView>
      </AppProvider>
    </ThemeProvider>
  );
};
