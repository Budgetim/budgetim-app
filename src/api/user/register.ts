import { User } from '../../types';

interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

export const register = async (params: RegisterParams): Promise<User> => {
  try {
    // const fn = async () => {
    //   const response = await fetch('https://api.budgetim.ru/users/register', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(params),
    //   });
    //   const result = await response.json() as User;
    //
    //   return new Promise((resolve => {
    //     setTimeout(() => {
    //       resolve(result);
    //     }, 5000);
    //   }))
    // }
    //
    // const res = await fn();
    // return res;

    const response = await fetch('https://api.budgetim.ru/users/register', {
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
}
