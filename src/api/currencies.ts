import { Currency } from '../types';
import { CurrencyModel } from '../db/currency';
import { db } from '../db';

const currencyModel = new CurrencyModel(db);

export const getCurrencies = async (): Promise<Currency[]> => {
  const currencies = await currencyModel.getCurrencies();
  return currencies;
};

export const getUsedCurrencies = async (): Promise<Currency[]> => {
  const result = await currencyModel.getUsedCurrencies();
  return result;
};
