import { authHeader } from '../../helpers/authHeader';
import { StatisticsItem } from '../../screens/Statistics/Statistics';

interface GetStatisticsParams {
  month: number;
  year: number;
}

type CallbackFunc = (statisticItems: StatisticsItem[]) => void;

export const getStatistics = async (params: GetStatisticsParams, callback: CallbackFunc, errorCallback: (error: string) => void, token: string | null) => {
  try {
    const response = await fetch('https://api.budgetim.ru/categories/statistic', {
      method: 'POST',
      headers: {
        ...authHeader(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    const categories = await response.json();
    callback(categories);
  } catch (error) {
    callback(error);
  }
}
