export interface Transaction {
  id: number;
  title: string;
  category: Category;
  currency: Currency;
  price: number;
  date: string;
}

export interface Category {
  id: number;
  title: string;
  color: string;
  description: string | null;
}

export interface Currency {
  id: number;
  code: string;
  symbol: string;
  position: 'L' | 'R';
}

export interface Action<T extends string, P extends unknown> {
  type: T;
  payload: P;
}

export type Trend = 'NEGATIVE' | 'POSITIVE' | 'NEUTRAL';
