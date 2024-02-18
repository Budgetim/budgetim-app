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

  getCurrency(id: number): Promise<Currency> {
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

  addCurrency(params: { code: string; symbol: string }): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.transaction(txn => {
        txn.executeSql(
          `
          INSERT INTO Currencies (code, symbol, position)
          VALUES ("${params.code}", "${params.symbol}", "R")
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

  editCurrency(params: { id: number; code: string; symbol: string }): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.transaction(txn => {
        txn.executeSql(
          `
          UPDATE
            Currencies SET code = "${params.code}",
            symbol = "${params.symbol}"
          WHERE Currencies.currency_id = ${params.id}
          `,
          [],
          () => {
            setTimeout(() => {
              resolve(true);
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
    return new Promise((resolve, reject) => {
      this.db.transaction(txn => {
        txn.executeSql(
          `
          DELETE FROM Currencies
          WHERE Currencies.currency_id = ${id}
          `,
          [],
          () => {
            setTimeout(() => {
              resolve();
            }, timeDelay);
          },
          () => {
            reject(i18n.t('categories.errors.delete'));
            return false;
          },
        );
      });
    });
  }
}
