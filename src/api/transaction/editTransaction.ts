import { Transaction } from '../../types';
import { authHeader } from '../../helpers/authHeader';

interface EditTransactionParams {
  id: number;
  title: string;
  categoryId: number;
  price: string;
  date: Date;
}

type CallbackFunc = (transaction: Transaction) => void;

export const editTransaction = async (params: EditTransactionParams, callback: CallbackFunc) => {
  try {
    const response = await fetch('https://api.budgetim.ru/transaction/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTYzMzc4NDUwNywiZXhwIjoxNjM0Mzg5MzA3fQ.vQbK2UfhABKIlqjwptTzlPiH0QqAok0GS65br8N4tts'),
      },
      body: JSON.stringify(params),
    });
    const transaction = await response.json();
    callback(transaction);
  } catch (error) {
    console.log(error);
  }
}
