import { Category } from '../../types';
import { authHeader } from '../../helpers/authHeader';

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
      headers: {
        ...authHeader('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTYzMzc4NDUwNywiZXhwIjoxNjM0Mzg5MzA3fQ.vQbK2UfhABKIlqjwptTzlPiH0QqAok0GS65br8N4tts'),
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
