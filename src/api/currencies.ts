import { Currency } from '../types';
import { CurrencyModel } from '../db/currency';
import { db } from '../db';

export const getCurrencies = async (): Promise<Currency[]> => {
  const currencyModel = new CurrencyModel(db);
  const currencies = await currencyModel.getCurrencies();
  return currencies;
};
