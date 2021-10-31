import { authHeader } from '../../helpers/authHeader';
import { StatisticsItem } from '../../screens/Statistics/Statistics';

interface GetStatisticsParams {
  month: number;
  year: number;
}

export const getStatistics = async (params: GetStatisticsParams, token: string | null): Promise<StatisticsItem[]> => {
  try {
    // const fn = async () => {
    //   const response = await fetch('https://api.budgetim.ru/categories/statistic', {
    //     method: 'POST',
    //     headers: {
    //       ...authHeader(token),
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(params),
    //   });
    //
    //   const result = await response.json() as StatisticsItem[];
    //
    //   return new Promise((resolve => {
    //     setTimeout(() => {
    //       resolve(result);
    //     }, 1000);
    //   }))
    // }
    //
    // const res = await fn();
    // return res;

    const response = await fetch('https://api.budgetim.ru/categories/statistic', {
      method: 'POST',
      headers: {
        ...authHeader(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    return await response.json() as StatisticsItem[];
  } catch (error: unknown) {
    console.error(error);
    throw (error as object).toString();
  }
}
