import React from 'react';
import { KeyboardAvoidingView, Platform, useColorScheme } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import { UserProvider } from './src/contexts/user';
import colors from './src/theme/colors';
import space from './src/theme/space';
import typography from './src/theme/typography';
import { Screens } from './src/screens';
import ru from './src/lang/ru.json';
import en from './src/lang/en.json';

i18n.translations = {
  'en': en,
  'ru': ru,
  'ru-RU': ru,
};
i18n.defaultLocale = 'en';
i18n.locale = Localization.locale;

export default function App() {
  const scheme = useColorScheme();
  const navigationTheme = scheme === 'dark' ? DarkTheme : DefaultTheme;
  return (
    <ThemeProvider theme={{ colors: scheme === 'dark' ? colors.dark : colors.light, space, typography }}>
      <UserProvider>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <NavigationContainer
            theme={{
              ...navigationTheme,
              colors: {
                ...navigationTheme.colors,
                background: scheme === 'dark' ? '#000000' : '#FFFFFF',
                border: scheme === 'dark' ? '#2C2C2E' : '#E5E5EA',
                card: scheme === 'dark' ? '#1D1D1D' : '#F9F9F9', // TODO: брать эти цвета из темы
              },
            }}
          >
            <Screens />
          </NavigationContainer>
        </KeyboardAvoidingView>
      </UserProvider>
    </ThemeProvider>
  );
};