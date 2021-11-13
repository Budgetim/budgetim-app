import { Currency } from '../../types';

export const getCurrencies = async (): Promise<Currency[]> => {
  try {
    // const fn = async () => {
    //   const response = await fetch('https://api.budgetim.ru/currency');
    //   const result = await response.json() as Currency[];
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
    const response = await fetch('https://api.budgetim.ru/currency');
    return await response.json() as Currency[];
  } catch (error: unknown) {
    console.error(error);
    throw (error as object).toString();
  }
}
