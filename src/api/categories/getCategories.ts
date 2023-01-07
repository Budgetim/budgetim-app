import { Category } from '../../types';
import { db } from '../../db';
import { CategoryModel } from '../../db/category';

export const getCategories = async (): Promise<Category[]> => {
  const categoryModel = new CategoryModel(db);
  const categories = await categoryModel.getCategories();
  return categories;
};
