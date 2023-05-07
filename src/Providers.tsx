import React, { FC } from 'react';
import { KeyboardAvoidingView, Platform, useColorScheme } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import colors from './theme/colors';
import space from './theme/space';
import typography from './theme/typography';
import { ModalsProvider } from './contexts/modals';
import { ThemeProvider } from 'styled-components';

export const queryClient = new QueryClient();

export const Providers: FC = ({ children }) => {
  const scheme = useColorScheme();
  const navigationTheme = scheme === 'dark' ? DarkTheme : DefaultTheme;
  return (
    <ThemeProvider theme={{ colors: scheme === 'dark' ? colors.dark : colors.light, space, typography, scheme }}>
      <QueryClientProvider client={queryClient}>
        <ModalsProvider>
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
              {children}
            </NavigationContainer>
          </KeyboardAvoidingView>
        </ModalsProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
