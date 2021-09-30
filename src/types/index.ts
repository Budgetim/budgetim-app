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