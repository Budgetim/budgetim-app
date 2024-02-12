export type CategoryDB = {
  id: number;
  title: string;
  color: string;
  description: string;
  total: number;
};

export type StatisticsItemDB = {
  color: string;
  description: string;
  month: string;
  year: string;
  id: number;
  sum: number;
  title: string;
};

export type TransactionDB = {
  categoryColor: string;
  categoryDescription: string;
  categoryId: string;
  categoryTitle: string;
  currencyCode: string;
  currencyId: string;
  currencyPosition: 'R' | 'L';
  currencySymbol: string;
  date: string;
  id: number;
  price: number;
  title: string;
};

export type CurrencyDB = {
  id: number;
  code: string;
  position: 'R' | 'L';
  symbol: string;
  total: number;
};

export type MonthsRangeDB = {
  min: string | null;
  max: string | null;
};
