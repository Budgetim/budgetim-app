import { useAppState } from './useAppState';

export const useTransactions = () => {
  const { transactions } = useAppState();
  return transactions;
};