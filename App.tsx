import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, useColorScheme } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import { locale } from 'expo-localization';
import i18n from 'i18n-js';

import { CategoriesProvider } from './src/contexts/categories';
import colors from './src/theme/colors';
import space from './src/theme/space';
import typography from './src/theme/typography';
import { Screens } from './src/screens';
import ru from './src/constants/lang/ru.json';
import en from './src/constants/lang/en.json';
import { CurrenciesProvider } from './src/contexts/currencies';
import { init } from './src/db/init';

i18n.translations = {
  en: en,
  ru: ru,
  'ru-RU': ru,
};

i18n.locale = locale;
i18n.fallbacks = true;

export default function App() {
  const scheme = useColorScheme();
  const navigationTheme = scheme === 'dark' ? DarkTheme : DefaultTheme;
  useEffect(init, []);
  return (
    <ThemeProvider theme={{ colors: scheme === 'dark' ? colors.dark : colors.light, space, typography, scheme }}>
      <CategoriesProvider>
        <CurrenciesProvider>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
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
        </CurrenciesProvider>
      </CategoriesProvider>
    </ThemeProvider>
  );
}
