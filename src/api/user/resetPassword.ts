import { User } from '../../types';

interface RegisterParams {
  email: string;
}

export const resetPassword = async (params: RegisterParams): Promise<User> => {
  try {
    const response = await fetch('http://api.budgetim.ru/users/resetPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: params.email.toLowerCase() }),
    });
    return (await response.json()) as User;
  } catch (error: unknown) {
    console.error(error);
    throw (error as object).toString();
  }
};
