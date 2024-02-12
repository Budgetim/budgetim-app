import { useQuery } from '@tanstack/react-query';
import { getCurrencies, getUsedCurrencies } from '../api/currencies';

export const useGetCurrencies = () => {
  return useQuery({
    queryKey: ['currencies'],
    queryFn: getCurrencies,
  });
};

export const useGetUsedCurrencies = () => {
  return useQuery({
    queryKey: ['usedCurrencies'],
    queryFn: getUsedCurrencies,
  });
};
