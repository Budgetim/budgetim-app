export interface Transaction {
  id: number;
  title: string;
  category: string;
  price: number;
  date: string;
}

export interface Category {
  id: number;
  title: string;
}