import { User } from '../../types';

interface RegisterParams {
  name: string;
  email: string;
  password: string;
  currencyId: number;
}

export const register = async (params: RegisterParams): Promise<User> => {
  try {
    // await new Promise(resolve => setTimeout(resolve, 3000));
    const response = await fetch('https://api.budgetim.ru/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...params, email: params.email.toLowerCase() }),
    });
    return (await response.json()) as User;
  } catch (error: unknown) {
    console.error(error);
    throw (error as object).toString();
  }
};
