import { WebsqlDatabase } from 'react-native-sqlite-2';
import { Currency } from '../types';
import { db } from '../db';

export class CurrencyModel {
  private db: WebsqlDatabase;

  constructor(database: WebsqlDatabase) {
    this.db = database;
  }

  getCurrencies(): Promise<Currency[]> {
    return new Promise((resolve, reject) => {
      db.transaction(txn => {
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
          (tx, res) => {
            const data = res.rows._array.map(({ id, code, symbol, position }) => ({
              id,
              code,
              symbol,
              position,
            }));
            setTimeout(() => {
              resolve(data);
            }, 1000);
          },
          (_transaction, error) => {
            reject(error.message);
            return true;
          },
        );
      });
    });
  }
}
