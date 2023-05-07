import { WebsqlDatabase } from 'react-native-sqlite-2';
import { Transaction } from '../types';
import { db } from '../db';
import format from 'date-fns/format';

type TransactionSQL = {
  categoryColor: string;
  categoryDescription: string;
  categoryId: string;
  categoryTitle: string;
  currencyCode: string;
  currencyId: string;
  currencyPosition: 'R' | 'L';
  currencySymbol: string;
  date: string;
  id: number;
  price: number;
  title: string;
};

export class TransactionModel {
  private db: WebsqlDatabase;

  constructor(database: WebsqlDatabase) {
    this.db = database;
  }

  private getTransactionFormat(transaction: TransactionSQL): Transaction {
    return {
      id: transaction.id,
      title: transaction.title,
      category: {
        id: +transaction.categoryId,
        title: transaction.categoryTitle,
        color: transaction.categoryColor,
        description: transaction.categoryDescription,
      },
      currency: {
        id: +transaction.currencyId,
        code: transaction.currencyCode,
        symbol: transaction.currencySymbol,
        position: transaction.currencyPosition,
      },
      price: transaction.price,
      date: transaction.date,
    };
  }

  getTransaction(id: number): Promise<Transaction> {
    return new Promise((resolve, reject) => {
      this.db.transaction(txn => {
        txn.executeSql(
          `
          SELECT
            Transactions.transaction_id AS id,
            Transactions.title,
            Categories.title AS categoryTitle,
            Categories.color AS categoryColor,
            Categories.description AS categoryDescription,
            Transactions.category AS categoryId,
            Currencies.code AS currencyCode,
            Currencies.symbol AS currencySymbol,
            Currencies.position AS currencyPosition,
            Transactions.currency AS currencyId,
            Transactions.price,
            Transactions.date
          FROM Transactions
          LEFT JOIN Categories ON Transactions.category = Categories.category_id
          LEFT JOIN Currencies ON Transactions.currency = Currencies.currency_id
          WHERE Transactions.transaction_id in (${id})
          `,
          [],
          (_tx, res) => {
            const transaction: TransactionSQL = res.rows.item(0);
            setTimeout(() => {
              resolve(this.getTransactionFormat(transaction));
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

  getTransactions({
    year,
    month,
    category,
  }: {
    year?: number;
    month?: number;
    category?: number;
  }): Promise<Transaction[]> {
    return new Promise((resolve, reject) => {
      let conditionQuery = '';
      if (year && month && category) {
        const monthFormat = month < 10 ? `0${month}` : month;
        conditionQuery = `
          WHERE
            strftime('%m', Transactions.date) = "${monthFormat}"
            AND strftime('%Y', Transactions.date) = "${year}"
            AND Transactions.category = ${category}
        `;
      }
      this.db.transaction(txn => {
        txn.executeSql(
          `
          SELECT
            Transactions.transaction_id AS id,
            Transactions.title,
            Categories.title AS categoryTitle,
            Categories.color AS categoryColor,
            Categories.description AS categoryDescription,
            Transactions.category AS categoryId,
            Currencies.code AS currencyCode,
            Currencies.symbol AS currencySymbol,
            Currencies.position AS currencyPosition,
            Transactions.currency AS currencyId,
            Transactions.price,
            Transactions.date
          FROM Transactions
          LEFT JOIN Categories ON Transactions.category = Categories.category_id
          LEFT JOIN Currencies ON Transactions.currency = Currencies.currency_id
          ${conditionQuery}
          ORDER BY Transactions.date DESC`,
          [],
          (_tx, res) => {
            const data: Transaction[] = [];
            for (let index = 0; index < res.rows.length; index++) {
              const transaction: TransactionSQL = res.rows.item(index);
              data.push(this.getTransactionFormat(transaction));
            }
            resolve(data);
          },
          (_transaction, error) => {
            reject(error.message);
            return true;
          },
        );
      });
    });
  }

  addTransaction(params: {
    title: string;
    categoryId: number;
    price: number;
    date: Date;
    currencyId: number;
  }): Promise<number> {
    return new Promise((resolve, reject) => {
      db.transaction(txn => {
        txn.executeSql(
          `
          INSERT INTO Transactions (title, currency, price, date, category)
          VALUES
            (
              "${params.title}",
              ${params.currencyId},
              "${params.price}",
              "${format(params.date, 'yyyy-MM-dd')}",
              ${params.categoryId ? params.categoryId : 'NULL'}
            )
          `,
          [],
          (_tx, res) => {
            resolve(res.insertId);
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

  editTransaction(params: {
    id: number;
    title: string;
    categoryId: number | null;
    price: number;
    date: Date;
    currencyId: number;
  }): Promise<boolean> {
    return new Promise((resolve, reject) => {
      db.transaction(txn => {
        txn.executeSql(
          `
          UPDATE Transactions
            SET
              title = "${params.title}",
              category = ${params.categoryId},
              price = ${params.price}, 
              date = "${format(params.date, 'yyyy-MM-dd')}",
              currency = ${params.currencyId}
          WHERE Transactions.transaction_id in (${params.id}
          )`,
          [],
          (_tx, _res) => {
            resolve(true);
          },
          (_transaction, error) => {
            console.error('transaction model: editTransaction', error);
            reject(error.message);
            return true;
          },
        );
      });
    });
  }

  deleteTransaction(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.transaction(txn => {
        txn.executeSql(
          `
          DELETE FROM Transactions
          WHERE Transactions.transaction_id in (${id})
          `,
          [],
          (_tx, _res) => {
            resolve(true);
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

  getAvailableMonths() {
    return new Promise((resolve, reject) => {
      this.db.transaction(txn => {
        txn.executeSql(
          `
          SELECT MIN(Transactions.date) as min, MAX(Transactions.date) as max
          FROM Transactions
          `,
          [],
          (_tx, result) => {
            const range = result.rows._array[0] as unknown as { min: string; max: string } | { min: null; max: null };
            if (!range.min && !range.max) {
              resolve({ data: [] });
            }
            const listMonths = this.getListMonths(range);
            resolve(listMonths);
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

  private getListMonths({ min, max }: { min: string; max: string }) {
    const startDate = min;
    const endDate = max;

    const start = startDate.split('-');
    const end = endDate.split('-');
    const startYear = parseInt(start[0]);
    const endYear = parseInt(end[0]);
    const dates = [];

    for (let year = startYear; year <= endYear; year++) {
      const endMonth = year != endYear ? 11 : parseInt(end[1]) - 1;
      const startMon = year === startYear ? parseInt(start[1]) - 1 : 0;
      for (let j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
        const month = j + 1;
        dates.push({ year, month });
      }
    }
    return { data: dates };
  }

  getUsedCurrencies(): Promise<any[]> {
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
            resolve(res.rows._array);
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
