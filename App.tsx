import React from 'react';
import { AppProvider } from './appContext';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { Transactions } from './screens/Transactions';

export default function App() {
  return (
    <AppProvider>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <Transactions />
      </KeyboardAvoidingView>
    </AppProvider>
  );
}
