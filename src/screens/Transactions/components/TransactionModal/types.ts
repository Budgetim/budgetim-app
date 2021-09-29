import { Transaction } from '../../../../types';

export interface TransactionModalProps extends Transaction {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}