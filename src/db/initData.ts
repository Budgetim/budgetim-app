import { locale } from 'expo-localization';
import format from 'date-fns/format';
import subDays from 'date-fns/subDays';

export const initData = () => {
  const currentData = new Date();
  if (locale === 'ru-RU' || locale === 'ru' || locale === 'ru-US') {
    return {
      currencies: [
        {
          code: 'RUB',
          symbol: '₽',
          position: 'R',
        },
        {
          code: 'USD',
          symbol: '$',
          position: 'R',
        },
        {
          code: 'EUR',
          symbol: '€',
          position: 'L',
        },
        {
          code: 'TL',
          symbol: '₺',
          position: 'R',
        },
      ],
      categories: [
        { title: 'Еда', color: '#4CAF50', description: 'Кафе, напитки, сладости' },
        { title: 'Одежда', color: '#673AB7', description: 'Любая одежда, носки' },
        { title: 'Здоровье', color: '#F2F2F2', description: 'Аптеки, врачи' },
      ],
      transactions: [
        { title: 'Кофе', category: 1, price: 120, date: format(currentData, 'yyyy-MM-dd'), currency: 1 },
        {
          title: 'Обувь',
          category: 2,
          price: 10199,
          date: format(subDays(currentData, 1), 'yyyy-MM-dd'),
          currency: 1,
        },
        {
          title: 'Лекарство',
          category: 3,
          price: 29,
          date: format(subDays(currentData, 3), 'yyyy-MM-dd'),
          currency: 2,
        },
      ],
    };
  }
  return {
    currencies: [
      {
        code: 'RUB',
        symbol: '₽',
        position: 'R',
      },
      {
        code: 'USD',
        symbol: '$',
        position: 'R',
      },
      {
        code: 'EUR',
        symbol: '€',
        position: 'L',
      },
      {
        code: 'TL',
        symbol: '₺',
        position: 'R',
      },
    ],
    categories: [
      { title: 'Food', color: '#4CAF50', description: 'Drinks, sweet, fast food' },
      { title: 'Clothes', color: '#673AB7', description: 'Shoes, t-shirts, socks' },
      { title: 'Health', color: '#F2F2F2', description: 'Medicine, doctors' },
    ],
    transactions: [
      { title: 'Coffee', category: 1, price: 5, date: format(currentData, 'yyyy-MM-dd'), currency: 2 },
      { title: 'Shoes', category: 2, price: 199, date: format(subDays(currentData, 1), 'yyyy-MM-dd'), currency: 2 },
      {
        title: 'Medicine',
        category: 3,
        price: 29,
        date: format(subDays(currentData, 3), 'yyyy-MM-dd'),
        currency: 2,
      },
    ],
  };
};
