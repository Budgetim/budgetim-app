import i18n from 'i18n-js';

export const getTitleCurrencyById = (id: number) => {
  if (id === 1) {
    return i18n.t('settings.currency.variants.ruble');
  }
  if (id === 2) {
    return i18n.t('settings.currency.variants.usd');
  }
  if (id === 3) {
    return i18n.t('settings.currency.variants.euro');
  }
  return '';
};
