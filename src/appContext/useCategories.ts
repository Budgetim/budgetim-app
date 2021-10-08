import { useAppState } from './useAppState';

export const useCategories = () => {
  const { categories } = useAppState();
  return categories;
};