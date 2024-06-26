import { AvailableMonth, Transaction } from '../types';
import { TransactionModel } from '../db/transaction';
import { db } from '../db';

export interface AddTransactionParams {
  title: string;
  categoryId: number;
  price: number;
  date: Date;
  currencyId: number;
}

const transactionModel = new TransactionModel(db);

export const addTransaction = async (params: AddTransactionParams): Promise<number> => {
  const id = await transactionModel.addTransaction(params);
  return id;
};

export const deleteTransaction = async (id: number) => {
  const result = await transactionModel.deleteTransaction(id);
  return result;
};

export interface EditTransactionParams {
  id: number;
  title: string;
  categoryId: number | null;
  price: number;
  date: Date;
  currencyId: number;
}

export const editTransaction = async (params: EditTransactionParams): Promise<void> => {
  await transactionModel.editTransaction(params);
};

export const getAvailableMonths = async (): Promise<AvailableMonth[]> => {
  const result = await transactionModel.getAvailableMonths();
  return result;
};

export interface GetTransactionsParams {
  year?: number;
  month?: number;
  category?: number | null;
}

export const getTransactions = async (params: GetTransactionsParams): Promise<Transaction[]> => {
  return transactionModel.getTransactions(params);
};

export const getTransactionById = async (id: number): Promise<Transaction> => {
  return transactionModel.getTransaction(id);
};
