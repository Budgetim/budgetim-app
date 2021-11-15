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
      body: JSON.stringify(params),
    });
    return await response.json() as User;
  } catch (error: unknown) {
    console.error(error);
    throw (error as object).toString();
  }
};
