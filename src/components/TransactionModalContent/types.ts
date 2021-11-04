export interface TransactionModalContentProps {
  title: string;
  setTitle: (title: string) => void;
  price: string;
  setPrice: (price: string) => void;
  categoryId: number | null;
  setCategoryId: (id: number | null) => void;
  date: Date;
  setDate: (date: Date) => void;
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
}