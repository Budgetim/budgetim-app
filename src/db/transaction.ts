import { WebsqlDatabase } from 'react-native-sqlite-2';
import { AvailableMonth, Transaction } from '../types';
import { db } from '../db';
import format from 'date-fns/format';
import { timeDelay } from '../constants/common';
import { MonthsRangeDB, TransactionDB } from './types';

export class TransactionModel {
  private db: WebsqlDatabase;

  constructor(database: WebsqlDatabase) {
    this.db = database;
  }

  private static transactionFormat(transaction: TransactionDB): Transaction {
    return {
      id: transaction.id,
      title: transaction.title,
      category: transaction.categoryId
        ? {
            id: +transaction.categoryId,
            title: transaction.categoryTitle as string,
            color: transaction.categoryColor as string,
            description: transaction.categoryDescription as string,
          }
        : null,
      currency: {
        id: +transaction.currencyId,
        title: transaction.currencyTitle,
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
            Currencies.title AS currencyTitle,
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
            const transaction: TransactionDB = res.rows.item(0);
            setTimeout(() => {
              resolve(TransactionModel.transactionFormat(transaction));
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
      if (year && month) {
        const monthFormat = month < 10 ? `0${month}` : month;
        const conditionCategory = category ? `Transactions.category = ${category}` : `Transactions.category IS NULL`;
        conditionQuery = `
          WHERE
            strftime('%m', Transactions.date) = "${monthFormat}"
            AND strftime('%Y', Transactions.date) = "${year}"
            AND ${conditionCategory}
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
            Currencies.title AS currencyTitle,
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
            const transactionsArray = (res.rows as unknown as { _array: TransactionDB[] })._array;
            const data = transactionsArray.map(transaction => TransactionModel.transactionFormat(transaction));
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

  editTransaction(params: {
    id: number;
    title: string;
    categoryId: number | null;
    price: number;
    date: Date;
    currencyId: number | null;
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
          () => {
            setTimeout(() => {
              resolve(true);
            }, timeDelay);
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

  getAvailableMonths(): Promise<AvailableMonth[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction(txn => {
        txn.executeSql(
          `
          SELECT MIN(Transactions.date) as min, MAX(Transactions.date) as max
          FROM Transactions
          `,
          [],
          (_tx, result) => {
            const range: MonthsRangeDB = result.rows.item(0);
            setTimeout(() => {
              resolve(TransactionModel.getListMonths(range));
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

  private static getListMonths({ min, max }: MonthsRangeDB): AvailableMonth[] {
    if (!min && !max) {
      return [];
    }

    const startDate = min as string;
    const endDate = max as string;

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
    return dates;
  }
}
