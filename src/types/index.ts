export interface Transaction {
  id: number;
  title: string;
  category: string;
  categoryId: number;
  price: string;
  date: string;
}

export interface Category {
  id: number;
  title: string;
}