import { Transaction } from '../../types';
import { TransactionModel } from '../../db/transaction';
import { db } from '../../db';

interface EditTransactionParams {
  id: number;
  title: string;
  categoryId: number | null;
  price: number;
  date: Date;
  currencyId: number;
}

export const editTransaction = async (params: EditTransactionParams): Promise<Transaction> => {
  const transactionModel = new TransactionModel(db);
  await transactionModel.editTransaction(params);
  const transaction = await transactionModel.getTransaction(params.id);
  return transaction;
};
