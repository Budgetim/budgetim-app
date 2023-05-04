import { Category } from '../types';
import { CategoryModel } from '../db/category';
import { db } from '../db';
import { StatisticsItem } from '../screens/StatisticsByDates/StatisticsInfo';

export const getCategories = async (): Promise<Category[]> => {
  const categoryModel = new CategoryModel(db);
  const categories = await categoryModel.getCategories();
  return categories;
};

export interface AddCategoryParams {
  title: string;
  description: string | null;
  color: string | null;
}

export const addCategory = async (params: AddCategoryParams): Promise<Category> => {
  const categoryModel = new CategoryModel(db);
  const id = await categoryModel.addCategory(params);
  const category = await categoryModel.getCategory(id);
  return category;
};

export const deleteCategory = async (id: number) => {
  const categoryModel = new CategoryModel(db);
  const result = categoryModel.deleteCategory(id);
  return result;
};

export interface EditCategoryParams {
  id: number;
  title: string;
  description: string | null;
  color: string | null;
}

export const editCategory = async (params: EditCategoryParams): Promise<Category> => {
  const categoryModel = new CategoryModel(db);
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
  const categoryModel = new CategoryModel(db);
  const statistic = await categoryModel.showStatistic(params);
  return statistic;
};
