import { Category } from '../../types';
import { authHeader } from '../../helpers/authHeader';

type CallbackFunc = (categories: Category[]) => void;

export const getCategories = async (callback: CallbackFunc, errorCallback: (error: string) => void) => {
  try {
    const response = await fetch('https://api.budgetim.ru/categories', {
      headers: authHeader('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTYzMzc4NDUwNywiZXhwIjoxNjM0Mzg5MzA3fQ.vQbK2UfhABKIlqjwptTzlPiH0QqAok0GS65br8N4tts'),
    });
    const categories = await response.json();
    callback(categories);
  } catch (error) {
    callback(error);
  }
}
