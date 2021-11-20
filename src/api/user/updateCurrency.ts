import { User } from '../../types';
import { authHeader } from '../../helpers/authHeader';

interface UpdateCurrencyParams {
  currencyId: number;
}

export const updateCurrency = async (params: UpdateCurrencyParams, token: string | null): Promise<User> => {
  try {
    const response = await fetch('http://api.budgetim.ru/users/updateCurrency', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(token),
      },
      body: JSON.stringify(params),
    });
    if (response.status === 403) {
      throw 403;
    }
    return await response.json() as User;
  } catch (error: unknown) {
    console.error(error);
    throw (error as object).toString();
  }
}
