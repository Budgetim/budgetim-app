import { Transaction } from '../../types';
import { db } from '../../db';
import { TransactionModel } from '../../db/transaction';

interface AddParams {
  title: string;
  categoryId: number;
  price: number;
  date: Date;
  currencyId: number;
}

export const addTransaction = async (params: AddParams): Promise<Transaction> => {
  const transactionModel = new TransactionModel(db);
  const id = await transactionModel.addTransaction(params);
  const transaction = await transactionModel.getTransaction(id);
  return transaction;
};
