import { Category } from '../../types';
import { CategoryModel } from '../../db/category';
import { db } from '../../db';

interface AddParams {
  title: string;
  description: string | null;
  color: string | null;
}

export const addCategory = async (params: AddParams): Promise<Category> => {
  const categoryModel = new CategoryModel(db);
  const id = await categoryModel.addCategory(params);
  const category = await categoryModel.getCategory(id);
  return category;
};
