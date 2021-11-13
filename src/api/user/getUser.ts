import { User } from '../../types';
import { authHeader } from '../../helpers/authHeader';

export const getUser = async (token: string | null): Promise<User> => {
  try {
    // const fn = async () => {
    //   const response = await fetch(`https://api.budgetim.ru/users`, {
    //     headers: authHeader(token),
    //   });
    //   const user = await response.json() as User;
    //
    //   return new Promise((resolve => {
    //     setTimeout(() => {
    //       resolve(user);
    //     }, 5000);
    //   }))
    // }
    //
    // const res = await fn();
    // return res;

    const response = await fetch(`https://api.budgetim.ru/users`, {
      headers: authHeader(token),
    });
    const user = await response.json() as User;
    return user;
  } catch (error: unknown) {
    console.error(error);
    throw (error as object).toString();
  }
}
