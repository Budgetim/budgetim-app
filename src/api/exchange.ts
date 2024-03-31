import { EXCHANGE_KEY } from '../constants/keys';
import { storage } from '../storage';

const API = 'http://api.exchangeratesapi.io/v1/';

export type CurrencyCode = 'RUB' | 'EUR' | 'USD';

type GetRatesProps = {
  base: CurrencyCode;
  symbols: CurrencyCode[];
};

type Result = {
  success: boolean;
  historical: boolean;
  date: string;
  timestamp: number;
  base: CurrencyCode;
  rates: { [key: string]: number };
};

const getFromStorage = (query: string) => {
  return new Promise(resolve => {
    storage
      .load({
        key: 'rates',
        id: query,
      })
      .then(data => {
        resolve(data);
      })
      .catch(() => {
        resolve(null);
      });
  });
};

export const getRates = async ({ base, symbols }: GetRatesProps): Promise<Result> => {
  if (symbols.length === 1 && base === symbols[0]) {
    return {
      base,
      date: '',
      rates: {
        [base]: 1,
      },
      success: true,
      timestamp: 0,
    };
  }

  const symbolsFormat = symbols.join(',');
  const query = `base=${base}&symbols=${symbolsFormat}`;

  const dataStorage = await getFromStorage(query);

  if (dataStorage) {
    return dataStorage as Result;
  }

  const response = await fetch(`${API}latest?access_key=${EXCHANGE_KEY}&${query}`);
  const data = await response.json();

  storage.save({
    key: 'rates',
    id: query,
    data: data,
  });

  return data;
};
