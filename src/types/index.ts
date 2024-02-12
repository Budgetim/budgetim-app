export interface Category {
  id: number;
  title: string;
  color: string;
  description: string | null;
}

export interface Transaction {
  id: number;
  title: string;
  category: Category;
  currency: Currency;
  price: number;
  date: string; // "2023-01-20"
}

export interface Currency {
  id: number;
  code: string;
  position: 'L' | 'R';
  symbol: string;
}

export type AvailableMonth = {
  month: number;
  year: number;
};

export type StatisticsItem = {
  color: string;
  description: string;
  id: number;
  sum: number;
  title: string;
};

export interface Action<T extends string, P extends unknown> {
  type: T;
  payload: P;
}
