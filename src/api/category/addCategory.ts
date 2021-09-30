import { Category } from '../../types';

interface AddParams {
  title: string;
  description: string | null;
  color: string | null;
}

type CallbackFunc = (category: Category) => void;

export const addCategory = async (params: AddParams, callback: CallbackFunc) => {
  try {
    const response = await fetch('https://api.budgetim.ru/categories/add', {
      method: 'POST',
      headers: {
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
