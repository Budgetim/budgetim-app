import { User } from '../../types';

interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

type CallbackFunc = (user: User) => void;

export const register = async (params: RegisterParams, callback: CallbackFunc) => {
  try {
    const response = await fetch('https://api.budgetim.ru/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    const user = await response.json();
    callback(user);
  } catch (error) {
    console.log(error);
  }
}
