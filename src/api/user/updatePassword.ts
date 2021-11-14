import { User } from '../../types';
import { authHeader } from '../../helpers/authHeader';

interface UpdatePasswordParams {
  password: string;
}

export const updatePassword = async (params: UpdatePasswordParams, token: string | null): Promise<User> => {
  try {

    const response = await fetch('https://api.budgetim.ru/users/updatePassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(token),
      },
      body: JSON.stringify(params),
    });
    return await response.json() as User;
  } catch (error: unknown) {
    console.error(error);
    throw (error as object).toString();
  }
}
