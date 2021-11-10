import { User } from '../../types';

interface AuthentificateParams {
  email: string;
  password: string;
}

export const authentificate = async (params: AuthentificateParams): Promise<User> => {
  try {
    const fn = async () => {
      const response = await fetch('https://api.budgetim.ru/users/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      const result = await response.json() as User;

      return new Promise((resolve => {
        setTimeout(() => {
          resolve(result);
        }, 2000);
      }))
    }

    const res = await fn();
    return res;

    // const response = await fetch('https://api.budgetim.ru/users/authenticate', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(params),
    // });
    // return await response.json() as User;
  } catch (error: unknown) {
    console.error(error);
    throw (error as object).toString();
  }
};
