import { useMutation, useQuery } from '@tanstack/react-query';
import { addCurrency, deleteCurrency, getCurrencies, getCurrency, getUsedCurrencies } from '../api/currencies';
import { queryClient } from '../Providers';

export const useGetCurrencies = () => {
  return useQuery({
    queryKey: ['currencies'],
    queryFn: getCurrencies,
  });
};

export const useGetCurrency = (id: number) => {
  return useQuery({
    queryKey: ['currencies', id],
    queryFn: () => getCurrency(id),
  });
};

export const useGetUsedCurrencies = () => {
  return useQuery({
    queryKey: ['usedCurrencies'],
    queryFn: getUsedCurrencies,
  });
};

export const useAddCurrency = () => {
  const mutation = useMutation({
    mutationFn: addCurrency,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currencies'] });
    },
  });
  return mutation;
};

export const useDeleteCurrency = () => {
  const mutation = useMutation({
    mutationFn: deleteCurrency,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currencies'] });
    },
  });
  return mutation;
};
