import { Category } from '../../types';
import { authHeader } from '../../helpers/authHeader';

interface EditCategoryParams {
  id: number;
  title: string;
  description: string | null;
  color: string | null;
}

type CallbackFunc = (category: Category) => void;

export const editCategory = async (params: EditCategoryParams, callback: CallbackFunc, token: string | null) => {
  try {
    const response = await fetch('https://api.budgetim.ru/categories/edit', {
      method: 'POST',
      headers: {
        ...authHeader(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    const category = await response.json();
    callback(category);
  } catch (error) {
    console.log(error);
  }
}
