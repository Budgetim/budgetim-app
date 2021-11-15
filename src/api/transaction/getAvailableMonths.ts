import { authHeader } from '../../helpers/authHeader';

export const getAvailableMonths = async (token: string | null): Promise<{ data: any[] }> => {
  try {
    // await new Promise(resolve => setTimeout(resolve, 3000));
    const response = await fetch(`https://api.budgetim.ru/transaction/availableMonths`, {
      headers: authHeader(token),
    });
    const dates = await response.json() as { data: any[] };
    return dates;
  } catch (error: unknown) {
    console.error(error);
    throw (error as object).toString();
  }
}
