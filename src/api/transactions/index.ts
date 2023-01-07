import { TransactionModel } from '../../db/transaction';
import { db } from '../../db';
import { Currency } from '../../types';

export const getUsedCurrencies = async (): Promise<Currency[]> => {
  const transactionModel = new TransactionModel(db);
  const result = await transactionModel.getUsedCurrencies();
  return result;
};
