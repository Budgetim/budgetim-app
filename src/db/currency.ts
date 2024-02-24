import { WebsqlDatabase } from 'react-native-sqlite-2';
import { Currency } from '../types';
import { timeDelay } from '../constants/common';
import { CurrencyDB } from './types';
import i18n from 'i18n-js';

export class CurrencyModel {
  private db: WebsqlDatabase;

  constructor(database: WebsqlDatabase) {
    this.db = database;
  }

  private static currencyFormat(currency: CurrencyDB): Currency {
    return {
      id: currency.id,
      title: currency.title,
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
            title,
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

  getCurrency(id: number): Promise<Currency> {
    return new Promise((resolve, reject) => {
      this.db.transaction(txn => {
        txn.executeSql(
          `
          SELECT
            currency_id AS id,
            title,
            symbol,
            position,
            (SELECT COUNT(*) FROM Transactions WHERE Transactions.currency = Currencies.currency_id) AS total
          FROM Currencies
          WHERE Currencies.currency_id in (${id})
          `,
          [],
          (_tx, res) => {
            const currency: CurrencyDB = res.rows.item(0);
            setTimeout(() => {
              resolve(CurrencyModel.currencyFormat(currency));
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

  getUsedCurrencies(): Promise<Currency[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction(txn => {
        txn.executeSql(
          `
          SELECT
            Currencies.currency_id AS id,
            Currencies.title,
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

  addCurrency(params: { title: string }): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.transaction(txn => {
        txn.executeSql(
          `
          INSERT INTO Currencies (title, symbol, position)
          VALUES ("${params.title}", "", "R")
          `,
          [],
          (_tx, res) => {
            setTimeout(() => {
              resolve(res.insertId);
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

  deleteCurrency(id: number): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const currencies = await this.getCurrencies();
      if (currencies.length === 1) {
        reject(i18n.t('categories.errors.deleteLast'));
      } else {
        this.db.transaction(txn => {
          txn.executeSql(
            `
          DELETE FROM Currencies
          WHERE Currencies.currency_id = ${id}
          `,
            [],
            () => {
              setTimeout(async () => {
                resolve();
              }, timeDelay);
            },
            () => {
              reject(i18n.t('categories.errors.deleteUsed'));
              return false;
            },
          );
        });
      }
    });
  }
}
