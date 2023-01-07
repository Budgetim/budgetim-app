import { db } from '../../db';
import { TransactionModel } from '../../db/transaction';
import { Transaction } from '../../types';

interface GetTransactionsParams {
  year?: number;
  month?: number;
  category?: number;
}

export const getTransactions = async (params: GetTransactionsParams): Promise<Transaction[]> => {
  const transaction = new TransactionModel(db);
  return transaction.getTransactions(params);
};
