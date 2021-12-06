import { User } from '../../types';

interface AuthentificateParams {
  email: string;
  password: string;
}

export const authentificate = async (params: AuthentificateParams): Promise<User> => {
  try {
    // await new Promise(resolve => setTimeout(resolve, 3000));
    const response = await fetch('https://api.budgetim.ru/users/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...params, email: params.email.toLowerCase() }),
    });
    const user = (await response.json()) as User;
    return user;
  } catch (error: unknown) {
    throw (error as object).toString();
  }
};
