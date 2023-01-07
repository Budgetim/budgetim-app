import { TransactionModel } from '../../db/transaction';
import { db } from '../../db';

export const deleteTransaction = async (id: number) => {
  const transactionModel = new TransactionModel(db);
  const result = await transactionModel.deleteTransaction(id);
  return result;
};
