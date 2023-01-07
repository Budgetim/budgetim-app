import { TransactionModel } from '../../db/transaction';
import { db } from '../../db';

export const getAvailableMonths = async (): Promise<{ data: any[] }> => {
  const transactionModel = new TransactionModel(db);
  const result = await transactionModel.getAvailableMonths();
  return result;
};
