export type Category = {
  id: number;
  title: string;
  color: string;
  description: string | null;
};

export interface Transaction {
  id: number;
  title: string;
  category: Category | null;
  currency: Currency;
  price: number;
  date: string; // "2023-01-20"
}

export interface Currency {
  id: number;
  title: string;
  position: 'L' | 'R';
  symbol: string;
}

export type AvailableMonth = {
  month: number;
  year: number;
};

export type StatisticsItem = {
  color: string | null;
  description: string | null;
  id: number | null;
  sum: number;
  title: string | null;
};

export interface Action<T extends string, P extends unknown> {
  type: T;
  payload: P;
}
