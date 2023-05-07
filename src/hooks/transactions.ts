import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getTransactions,
  deleteTransaction,
  editTransaction,
  addTransaction,
  GetTransactionsParams,
  getAvailableMonths,
  getUsedCurrencies,
  getTransactionById,
} from '../api/transactions';
import { queryClient } from '../Providers';

export const useGetTransactions = (params: GetTransactionsParams = {}) => {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: () => getTransactions(params),
  });
};

export const useGetTransaction = (id: number) => {
  return useQuery({
    queryKey: ['transactions', id],
    queryFn: () => getTransactionById(id),
  });
};

export const useGetAvailableMonths = () => {
  return useQuery({
    queryKey: ['avaliableMonths'],
    queryFn: getAvailableMonths,
  });
};

export const useGetUsedCurrencies = () => {
  return useQuery({
    queryKey: ['usedCurrencies'],
    queryFn: getUsedCurrencies,
  });
};

export const useDeleteTransaction = () => {
  const mutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
  return mutation.mutate;
};

export const useEditTransaction = () => {
  const mutation = useMutation({
    mutationFn: editTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
  return mutation.mutate;
};

export const useAddTransaction = () => {
  const mutation = useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
  return mutation;
};
