import { CategoryModel } from '../../db/category';
import { db } from '../../db';

export const deleteCategory = async (id: number) => {
  const categoryModel = new CategoryModel(db);
  const result = categoryModel.deleteCategory(id);
  return result;
};
