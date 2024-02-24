import { EXCHANGE_KEY } from '../constants/keys';

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
  const response = await fetch(`${API}latest?access_key=${EXCHANGE_KEY}&base=${base}&symbols=${symbolsFormat}`);
  const data = await response.json();
  return data;
};
