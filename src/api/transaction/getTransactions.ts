import { Transaction } from '../../types';
import { authHeader } from '../../helpers/authHeader';

type CallbackFunc = (categories: Transaction[]) => void;

export const getTransactions = async (callback: CallbackFunc, errorCallback: (err: string) => void) => {
  try {
    const response = await fetch('https://api.budgetim.ru/transaction', {
      headers: authHeader('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTYzMzc4NDUwNywiZXhwIjoxNjM0Mzg5MzA3fQ.vQbK2UfhABKIlqjwptTzlPiH0QqAok0GS65br8N4tts'),
    });
    const transactions = await response.json();
    callback(transactions);
  } catch (error) {
    errorCallback(error);
  }
}
