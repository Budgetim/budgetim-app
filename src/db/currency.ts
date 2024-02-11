import { WebsqlDatabase } from 'react-native-sqlite-2';
import { Currency } from '../types';
import { timeDelay } from '../constants/common';
import { CurrencyDB } from './types';

export class CurrencyModel {
  private db: WebsqlDatabase;

  constructor(database: WebsqlDatabase) {
    this.db = database;
  }

  private static currencyFormat(currency: CurrencyDB): Currency {
    return {
      id: currency.id,
      code: currency.code,
      position: currency.position,
      symbol: currency.symbol,
    };
  }

  getCurrencies(): Promise<Currency[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction(txn => {
        txn.executeSql(
          `
          SELECT
            currency_id AS id,
            code,
            symbol,
            position,
            (SELECT COUNT(*) FROM Transactions WHERE Transactions.currency = Currencies.currency_id) AS total
          FROM Currencies
          ORDER BY total DESC`,
          [],
          (_tx, res) => {
            const currenciesArray = (res.rows as unknown as { _array: CurrencyDB[] })._array;
            const data = currenciesArray.map(currency => CurrencyModel.currencyFormat(currency));
            setTimeout(() => {
              resolve(data);
            }, timeDelay);
          },
          (_transaction, error) => {
            reject(error.message);
            return true;
          },
        );
      });
    });
  }

  getUsedCurrencies(): Promise<Currency[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction(txn => {
        txn.executeSql(
          `
          SELECT
            Currencies.currency_id AS id,
            Currencies.code,
            Currencies.symbol,
            Currencies.position,
            (SELECT COUNT(*) FROM Transactions WHERE Transactions.currency = Currencies.currency_id) AS total
          FROM Transactions
          INNER JOIN Currencies ON Transactions.currency = Currencies.currency_id
          GROUP BY Currencies.currency_id
          ORDER BY total DESC
          `,
          [],
          (_tx, res) => {
            const currenciesArray = (res.rows as unknown as { _array: CurrencyDB[] })._array;
            const data = currenciesArray.map(currency => CurrencyModel.currencyFormat(currency));
            setTimeout(() => {
              resolve(data);
            }, timeDelay);
          },
          (_transaction, error) => {
            console.error(error);
            reject(error.message);
            return true;
          },
        );
      });
    });
  }
}
