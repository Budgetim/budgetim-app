import { authHeader } from '../../utils/authHeader';
import { statisticsByDays } from './__mocks__/statisticsByDays';

export const getStatisticsByDays = async (token: string | null): Promise<any[]> => {
  try {
    // await new Promise(resolve => setTimeout(resolve, 3000));
    const response = await fetch('https://api.budgetim.ru/categories/allStatistics', {
      method: 'POST',
      headers: {
        ...authHeader(token),
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 403) {
      throw 403;
    }

    return (await response.json()) as any[];
    //return statisticsByDays;
  } catch (error: unknown) {
    console.error(error);
    throw (error as object).toString();
  }
};
