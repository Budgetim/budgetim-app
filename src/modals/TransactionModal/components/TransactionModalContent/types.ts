export interface TransactionModalContentProps {
  title: string;
  setTitle: (title: string) => void;
  price: number | string; // string только пустая строка
  setPrice: (price: number) => void;
  categoryId: number | null;
  setCategoryId: (id: number | null) => void;
  currencyId: number;
  setCurrencyId: (id: number) => void;
  date: Date;
  setDate: (date: Date) => void;
}
