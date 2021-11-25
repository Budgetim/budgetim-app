import { authHeader } from '../../utils/authHeader';

export const getAvailableMonths = async (token: string | null): Promise<{ data: any[] }> => {
  try {
    // await new Promise(resolve => setTimeout(resolve, 3000));
    const response = await fetch(`http://api.budgetim.ru/transactions/availableMonths`, {
      headers: authHeader(token),
    });
    if (response.status === 403) {
      throw 403;
    }
    const dates = await response.json() as { data: any[] };
    return dates;
  } catch (error: unknown) {
    console.error(error);
    throw (error as object).toString();
  }
}
