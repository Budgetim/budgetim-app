import { Transaction } from '../types';

export const getPopularNames = (transactions: Transaction[], str: string) => {
  const pattern = new RegExp(str, 'ig');
  const items: { title: string; count: number }[] = [];

  transactions.forEach(({ title }) => {
    const foundedItem = items.find(item => item.title === title);
    if (foundedItem) {
      foundedItem.count++;
    } else {
      items.push({
        title,
        count: 1,
      });
    }
  });

  return items.filter(item => pattern.test(item.title))
    .sort((a, b) => {
      if (a.count > b.count) {
        return -1;
      }
      if (a.count < b.count) {
        return 1;
      }
      return 0;
    })
    .map(item => item.title);
};