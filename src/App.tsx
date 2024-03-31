import React, { useEffect } from 'react';
import { locale } from 'expo-localization';
import i18n from 'i18n-js';
import { Screens } from './screens';
import ru from './constants/lang/ru.json';
import en from './constants/lang/en.json';
import { init } from './db/init';
import { Providers } from './Providers';
import { TransactionModal } from './modals/TransactionModal';

i18n.translations = {
  en: en,
  ru: ru,
  'ru-RU': ru,
};

i18n.locale = locale;
i18n.fallbacks = true;

export default function App() {
  useEffect(() => {
    init();
  }, []);

  return (
    <Providers>
      <Screens />
      <TransactionModal />
    </Providers>
  );
}
