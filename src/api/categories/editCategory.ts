import { Category } from '../../types';
import { db } from '../../screens';
import { CategoryModel } from '../../db/category';

interface EditCategoryParams {
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
