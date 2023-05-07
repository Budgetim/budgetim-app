import { Category } from '../types';
import { CategoryModel } from '../db/category';
import { db } from '../db';
import { StatisticsItem } from '../screens/StatisticsByDates/StatisticsInfo';

const categoryModel = new CategoryModel(db);

export const getCategories = async (): Promise<Category[]> => {
  const categories = await categoryModel.getCategories();
  return categories;
};

export const getCategory = async (id: number): Promise<Category> => {
  const category = await categoryModel.getCategory(id);
  return category;
};

export interface AddCategoryParams {
  title: string;
  description: string | null;
  color: string | null;
}

export const addCategory = async (params: AddCategoryParams): Promise<number> => {
  const id = await categoryModel.addCategory(params);
  return id;
};

export const deleteCategory = async (id: number) => {
  await categoryModel.deleteCategory(id);
};

export interface EditCategoryParams {
  id: number;
  title: string;
  description: string | null;
  color: string | null;
}

export const editCategory = async (params: EditCategoryParams): Promise<Category> => {
  await categoryModel.editCategory(params);
  const category = await categoryModel.getCategory(params.id);
  return category;
};

export interface GetStatisticsParams {
  month: number;
  year: number;
  currencyId: number;
}

export const getStatistics = async (params: GetStatisticsParams): Promise<StatisticsItem[]> => {
  const statistic = await categoryModel.showStatistic(params);
  return statistic;
};
