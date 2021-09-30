import { Category } from '../../../../types';

export interface TransactionModalProps {
  transaction: {
    id?: number;
    title: string;
    category: Category | null;
    price: string;
    date: string | null;
  }
  visible: boolean;
  setVisible: (visible: boolean) => void;
}