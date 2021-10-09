import { authHeader } from '../../helpers/authHeader';

export const deleteTransaction = async (id: number, callback: () => void) => {
  try {
    const response = await fetch('https://api.budgetim.ru/transaction/delete', {
      method: 'POST',
      headers: {
        ...authHeader('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTYzMzc4NDUwNywiZXhwIjoxNjM0Mzg5MzA3fQ.vQbK2UfhABKIlqjwptTzlPiH0QqAok0GS65br8N4tts'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      callback();
    }
  } catch (error) {
    console.log(error);
  }
}
