import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../Providers';
import {
  addCategory,
  deleteCategory,
  editCategory,
  getCategories,
  getCategory,
  getStatistics,
  GetStatisticsParams,
} from '../api/categories';

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
};

export const useGetCategory = (id: number) => {
  return useQuery({
    queryKey: ['categories', id],
    queryFn: () => getCategory(id),
  });
};

export const useAddCategory = () => {
  const mutation = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
  return mutation;
};

export const useDeleteCategory = () => {
  const mutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
  return mutation.mutate;
};

export const useEditCategory = () => {
  const mutation = useMutation({
    mutationFn: editCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
  return mutation.mutate;
};

export const useGetStatistics = (params: GetStatisticsParams) => {
  return useQuery({
    queryKey: ['statistics', params],
    queryFn: () => getStatistics(params),
  });
};
