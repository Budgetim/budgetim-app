import i18n from 'i18n-js';

export const getCategoryTitle = (title: string | null) => {
  if (title === null) {
    return i18n.t('categories.messages.noCategory');
  }
  if (!title) {
    return i18n.t('categories.emptyTitle');
  }
  return title;
};
