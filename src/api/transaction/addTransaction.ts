import { Transaction } from '../../types';
import { authHeader } from '../../helpers/authHeader';

interface AddParams {
  title: string;
  categoryId: number;
  price: string;
  date: Date;
}

type CallbackFunc = (transaction: Transaction) => void;

export const addTransaction = async (params: AddParams, callback: CallbackFunc) => {
  try {
    const response = await fetch('https://api.budgetim.ru/transaction/add', {
      method: 'POST',
      headers: {
        ...authHeader('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTYzMzc4NDUwNywiZXhwIjoxNjM0Mzg5MzA3fQ.vQbK2UfhABKIlqjwptTzlPiH0QqAok0GS65br8N4tts'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    const transaction = await response.json();
    callback(transaction);
  } catch (error) {
    console.log(error);
  }
}
