import { Currency, Transaction } from '../types';
import { TransactionModel } from '../db/transaction';
import { db } from '../db';

export interface AddTransactionParams {
  title: string;
  categoryId: number;
  price: number;
  date: Date;
  currencyId: number;
}

export const addTransaction = async (params: AddTransactionParams): Promise<Transaction> => {
  const transactionModel = new TransactionModel(db);
  const id = await transactionModel.addTransaction(params);
  const transaction = await transactionModel.getTransaction(id);
  return transaction;
};

export const deleteTransaction = async (id: number) => {
  const transactionModel = new TransactionModel(db);
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

export const editTransaction = async (params: EditTransactionParams): Promise<Transaction> => {
  const transactionModel = new TransactionModel(db);
  await transactionModel.editTransaction(params);
  const transaction = await transactionModel.getTransaction(params.id);
  return transaction;
};

export const getAvailableMonths = async (): Promise<{ data: any[] }> => {
  const transactionModel = new TransactionModel(db);
  const result = await transactionModel.getAvailableMonths();
  return result;
};

export interface GetTransactionsParams {
  year?: number;
  month?: number;
  category?: number;
}

export const getTransactions = async (params: GetTransactionsParams): Promise<Transaction[]> => {
  const transaction = new TransactionModel(db);
  return transaction.getTransactions(params);
};

export const getUsedCurrencies = async (): Promise<Currency[]> => {
  const transactionModel = new TransactionModel(db);
  const result = await transactionModel.getUsedCurrencies();
  return result;
};
