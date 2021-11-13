export interface Transaction {
  id: number;
  title: string;
  category: Category;
  price: string;
  date: string;
}

export interface Category {
  id: number;
  title: string;
  color: string | null;
  description: string | null;
}

export interface Currency {
  id: number;
  title: string;
  unit: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  token: string;
  currency: Currency;
}

export interface Action<T extends string, P extends unknown> {
  type: T;
  payload: P;
}