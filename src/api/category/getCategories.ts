import { Category } from '../../types';
import { authHeader } from '../../helpers/authHeader';

export const getCategories = async (token: string | null): Promise<Category[]> => {
  try {
    // const fn = async () => {
    //   const response = await fetch('https://api.budgetim.ru/categories', {
    //     headers: authHeader(token),
    //   });
    //   const result = await response.json() as Category[];
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
    const response = await fetch('https://api.budgetim.ru/categories', {
      headers: authHeader(token),
    });
    return await response.json() as Category[];
  } catch (error: unknown) {
    console.error(error);
    throw (error as object).toString();
  }
}
