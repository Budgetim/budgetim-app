import { authHeader } from '../../helpers/authHeader';

interface GetCategoryStatisticsParams {
  categoryId: number;
}

export const getCategoryStatistics = async (params: GetCategoryStatisticsParams, token: string | null): Promise<any> => {
  try {
    // await new Promise(resolve => setTimeout(resolve, 3000));
    const response = await fetch('http://api.budgetim.ru/categories/categoryStatistics', {
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

    return await response.json() as any;
  } catch (error: unknown) {
    console.error(error);
    throw (error as object).toString();
  }
}
