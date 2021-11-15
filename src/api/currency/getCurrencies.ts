import { Currency } from '../../types';

export const getCurrencies = async (): Promise<Currency[]> => {
  try {
    // await new Promise(resolve => setTimeout(resolve, 3000));
    const response = await fetch('https://api.budgetim.ru/currency');
    return await response.json() as Currency[];
  } catch (error: unknown) {
    console.error(error);
    throw (error as object).toString();
  }
}
