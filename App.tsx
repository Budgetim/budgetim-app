import React, { useEffect } from 'react';
import { locale } from 'expo-localization';
import i18n from 'i18n-js';
import { Screens } from './src/screens';
import ru from './src/constants/lang/ru.json';
import en from './src/constants/lang/en.json';
import { init } from './src/db/init';
import { Providers } from './src/Providers';
import { TransactionModal } from './src/modals/TransactionModal';

i18n.translations = {
  en: en,
  ru: ru,
  'ru-RU': ru,
};

i18n.locale = locale;
i18n.fallbacks = true;

export default function App() {
  useEffect(init, []);
  return (
    <Providers>
      <Screens />
      <TransactionModal />
    </Providers>
  );
}
