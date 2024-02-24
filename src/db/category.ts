import { WebsqlDatabase } from 'react-native-sqlite-2';
import { Category, StatisticsItem } from '../types';
import i18n from 'i18n-js';
import { timeDelay } from '../constants/common';
import { CategoryDB, StatisticsItemDB } from './types';

export class CategoryModel {
  private db: WebsqlDatabase;

  constructor(database: WebsqlDatabase) {
    this.db = database;
  }

  private static categoryFormat(category: CategoryDB): Category {
    return {
      id: category.id,
      title: category.title,
      color: category.color,
      description: category.description,
    };
  }

  private static statisticsItemFormat(item: StatisticsItemDB): StatisticsItem {
    return {
      color: item.color,
      description: item.description,
      categoryId: item.categoryId,
      sum: item.sum,
      title: item.title,
    };
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
          (_tx, res) => {
            const categoriesArray = (res.rows as unknown as { _array: CategoryDB[] })._array;
            const data = categoriesArray.map(category => CategoryModel.categoryFormat(category));
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
            const categoriesArray = (res.rows as unknown as { _array: CategoryDB[] })._array;
            const category = categoriesArray[0];
            setTimeout(() => {
              if (!category) {
                reject('not found');
              } else {
                resolve(CategoryModel.categoryFormat(category));
              }
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

  deleteCategory(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.transaction(txn => {
        txn.executeSql(
          `
          DELETE FROM Categories
          WHERE Categories.category_id = ${id}
          `,
          [],
          () => {
            setTimeout(() => {
              resolve();
            }, timeDelay);
          },
          () => {
            reject(i18n.t('categories.errors.deleteUsed'));
            return false;
          },
        );
      });
    });
  }

  showStatistic(params: { month: number; year: number; currencyId: number }): Promise<StatisticsItem[]> {
    const monthFormat = params.month < 10 ? `0${params.month}` : params.month;
    return new Promise((resolve, reject) => {
      this.db.transaction(txn => {
        txn.executeSql(
          `
          SELECT
            SUM(Transactions.price) as sum,
            Categories.category_id AS categoryId,
            Categories.color, 
            Categories.title,
            Categories.description,
            strftime('%m', Transactions.date) AS month,
            strftime('%Y', Transactions.date) AS year
          FROM Transactions
          LEFT JOIN Categories 
            ON Categories.category_id = Transactions.category
          WHERE
            month = "${monthFormat}"
            AND year = "${params.year}"
            AND Transactions.currency = ${params.currencyId}
          GROUP BY Categories.category_id
          ORDER BY sum DESC
          `,
          [],
          (_tx, res) => {
            const statisticsArray = (res.rows as unknown as { _array: StatisticsItemDB[] })._array;
            setTimeout(() => {
              resolve(statisticsArray.map(item => CategoryModel.statisticsItemFormat(item)));
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
