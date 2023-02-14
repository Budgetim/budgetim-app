import { WebsqlDatabase } from 'react-native-sqlite-2';
import { Category } from '../types';
import i18n from 'i18n-js';

export class CategoryModel {
  private db: WebsqlDatabase;

  constructor(database: WebsqlDatabase) {
    this.db = database;
  }

  getCategories(): Promise<Category[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction(txn => {
        txn.executeSql(
          `
          SELECT
            category_id AS id,
            title,
            description,
            color,
            (SELECT COUNT(*) FROM Transactions WHERE Transactions.category = Categories.category_id) AS total
          FROM Categories
          ORDER BY total DESC
          `,
          [],
          (tx, res) => {
            const data = res.rows._array.map(category => ({
              id: category.id,
              title: category.title,
              color: category.color,
              description: category.description,
            }));
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

  getCategory(id: number): Promise<Category> {
    return new Promise((resolve, reject) => {
      this.db.transaction(txn => {
        txn.executeSql(
          `
          SELECT
            category_id AS id,
            title,
            description,
            color,
            (SELECT COUNT(*) FROM Transactions WHERE Transactions.category = Categories.category_id) AS total
          FROM Categories
          WHERE Categories.category_id in (${id})
          `,
          [],
          (_tx, res) => {
            const item = res.rows._array[0];
            const category = {
              id: item.id,
              title: item.title,
              color: item.color,
              description: item.description,
            };
            resolve(category);
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

  addCategory(params: { title: string; description: string | null; color: string | null }): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.transaction(txn => {
        txn.executeSql(
          `
          INSERT INTO Categories (title, color, description)
          VALUES ("${params.title}", "${params.color}", "${params.description}")
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

  editCategory(params: {
    id: number;
    title: string;
    description: string | null;
    color: string | null;
  }): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.transaction(txn => {
        txn.executeSql(
          `
          UPDATE
            Categories SET title = "${params.title}",
            description = "${params.description}",
            color = "${params.color}"
          WHERE Categories.category_id = ${params.id}
          `,
          [],
          (_tx, res) => {
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

  deleteCategory(id: number): Promise<boolean> {
    return new Promise(resolve => {
      this.db.transaction(txn => {
        txn.executeSql(
          `
          DELETE FROM Categories
          WHERE Categories.category_id = ${id}
          `,
          [],
          (_tx, _res) => {
            resolve(true);
          },
          () => {
            throw new Error(i18n.t('categories.errors.delete'));
          },
        );
      });
    });
  }

  showStatistic(params: { month: number; year: number; currencyId: number }): Promise<any[]> {
    const monthFormat = params.month < 10 ? `0${params.month}` : params.month;
    return new Promise((resolve, reject) => {
      this.db.transaction(txn => {
        txn.executeSql(
          `
          SELECT
            SUM(Transactions.price) as sum,
            Categories.category_id AS id,
            Categories.color, 
            Categories.title,
            Categories.description,
            strftime('%m', Transactions.date) AS month,
            strftime('%Y', Transactions.date) AS year
          FROM Transactions
          INNER JOIN Categories ON Transactions.category = Categories.category_id
          WHERE
            month = "${monthFormat}"
            AND year = "${params.year}"
            AND Transactions.currency = ${params.currencyId}
          GROUP BY Categories.category_id
          ORDER BY sum DESC
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
