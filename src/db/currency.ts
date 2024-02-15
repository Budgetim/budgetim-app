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

  addCurrency(params: { title: string; description: string | null; color: string | null }): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.transaction(txn => {
        txn.executeSql(
          `
          INSERT INTO Currencies (code, symbol, position)
          VALUES ("${params.title}", "${params.color}", "${params.description}")
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

  // editCurrency(params: {
  //   id: number;
  //   title: string;
  //   description: string | null;
  //   color: string | null;
  // }): Promise<boolean> {
  //   return new Promise((resolve, reject) => {
  //     this.db.transaction(txn => {
  //       txn.executeSql(
  //         `
  //         UPDATE
  //           Categories SET title = "${params.title}",
  //           description = "${params.description}",
  //           color = "${params.color}"
  //         WHERE Categories.category_id = ${params.id}
  //         `,
  //         [],
  //         () => {
  //           setTimeout(() => {
  //             resolve(true);
  //           }, timeDelay);
  //         },
  //         (_transaction, error) => {
  //           console.error(error);
  //           reject(error.message);
  //           return true;
  //         },
  //       );
  //     });
  //   });
  // }
  //
  // deleteCurrency(id: number): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     this.db.transaction(txn => {
  //       txn.executeSql(
  //         `
  //         DELETE FROM Categories
  //         WHERE Categories.category_id = ${id}
  //         `,
  //         [],
  //         () => {
  //           setTimeout(() => {
  //             resolve();
  //           }, timeDelay);
  //         },
  //         () => {
  //           reject(i18n.t('categories.errors.delete'));
  //           return false;
  //         },
  //       );
  //     });
  //   });
  // }
}
