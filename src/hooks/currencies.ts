import { useQuery } from '@tanstack/react-query';
import { getCurrencies } from '../api/currencies';

export const useGetCurrencies = () => {
  return useQuery({
    queryKey: ['currencies'],
    queryFn: () => getCurrencies(),
  });
};
