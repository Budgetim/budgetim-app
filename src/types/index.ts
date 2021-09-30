export interface Transaction {
  id: number;
  title: string;
  category: Category;
  categoryId: number;
  price: string;
  date: string;
}

export interface Category {
  id: number;
  title: string;
  color: string | null;
  description: string | null;
}