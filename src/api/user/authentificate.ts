import { User } from '../../types';

interface AuthentificateParams {
  email: string;
  password: string;
}

type CallbackFunc = (user: User) => void;

export const authentificate = async (params: AuthentificateParams, callback: CallbackFunc) => {
  try {
    const response = await fetch('https://api.budgetim.ru/users/authenticate', {
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
