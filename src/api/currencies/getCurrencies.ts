import { Currency } from '../../types';
import { db } from '../../db';
import { CurrencyModel } from '../../db/currency';

export const getCurrencies = async (): Promise<Currency[]> => {
  const currencyModel = new CurrencyModel(db);
  const currencies = await currencyModel.getCurrencies();
  return currencies;
};
