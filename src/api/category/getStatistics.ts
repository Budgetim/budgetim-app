import { authHeader } from '../../helpers/authHeader';

interface GetStatisticsParams {
  month: number;
  year: number;
}

export const getStatistics = async (params: GetStatisticsParams, token: string | null) => {
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
    return categories;
  } catch (e) {
    throw 'Ошибка при выполнении запроса';
  }
}
