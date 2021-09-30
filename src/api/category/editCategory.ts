import { Category } from '../../types';

interface EditCategoryParams {
  id: number;
  title: string;
  description: string | null;
  color: string | null;
}

type CallbackFunc = (category: Category) => void;

export const editCategory = async (params: EditCategoryParams, callback: CallbackFunc) => {
  try {
    const response = await fetch('https://api.budgetim.ru/categories/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    const category = await response.json();
    callback(category);
  } catch (error) {
    console.log(error);
  }
}
