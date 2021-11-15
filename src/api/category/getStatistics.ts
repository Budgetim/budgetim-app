import { authHeader } from '../../helpers/authHeader';
import { StatisticsItem } from '../../screens/Statistics/Statistics';

interface GetStatisticsParams {
  month: number;
  year: number;
}

export const getStatistics = async (params: GetStatisticsParams, token: string | null): Promise<StatisticsItem[]> => {
  try {
    // await new Promise(resolve => setTimeout(resolve, 3000));
    const response = await fetch('https://api.budgetim.ru/categories/statistic', {
      method: 'POST',
      headers: {
        ...authHeader(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (response.status === 403) {
      throw 403;
    }

    return await response.json() as StatisticsItem[];
  } catch (error: unknown) {
    console.error(error);
    throw (error as object).toString();
  }
}
