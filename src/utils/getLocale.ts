import en from 'date-fns/locale/en-US';
import ru from 'date-fns/locale/ru';
import { locale } from 'expo-localization';

export const getLocale = () => {
  if (locale === 'ru-RU' || locale === 'ru' || locale === 'ru-US') {
    return ru;
  }
  return en;
};
