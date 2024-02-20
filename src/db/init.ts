import { initData } from './initData';
import { SQLError, SQLTransaction } from 'react-native-sqlite-2';
import { db } from './';

const success = () => {};

const errorCallback = (id: string) => (_transaction: SQLTransaction, err: SQLError) => {
  console.error(`${id}: ${err}`);
  return true;
};

export const init = () => {
  const data = initData();
  db.transaction(txn => {
    //txn.executeSql('DROP TABLE IF EXISTS Transactions', [], success, errorCallback('DROP TABLE Transactions'));
    //txn.executeSql('DROP TABLE IF EXISTS Categories', [], success, errorCallback('DROP TABLE Categories'));
    //txn.executeSql('DROP TABLE IF EXISTS Currencies', [], success, errorCallback('DROP TABLE Currencies'));
    txn.executeSql(
      `
        SELECT name FROM sqlite_master WHERE type='table' AND name='Categories';
        `,
      [],
      (_, res) => {
        txn.executeSql(
          `
        CREATE TABLE IF NOT EXISTS Categories (
          category_id INTEGER PRIMARY KEY NOT NULL,
          title VARCHAR(128) NOT NULL,
          color VARCHAR(128) NOT NULL,
          description VARCHAR(128)
        )`,
          [],
          success,
          errorCallback('CREATE TABLE IF NOT EXISTS Categories'),
        );
        txn.executeSql(
          `
        CREATE TABLE IF NOT EXISTS Currencies (
          currency_id INTEGER PRIMARY KEY NOT NULL,
          title VARCHAR(128) NOT NULL,
          symbol VARCHAR(128) NOT NULL,
          position VARCHAR(128) NOT NULL
        )`,
          [],
          success,
          errorCallback('CREATE TABLE IF NOT EXISTS Currencies'),
        );
        txn.executeSql(
          `
        CREATE TABLE IF NOT EXISTS Transactions (
          transaction_id INTEGER PRIMARY KEY NOT NULL,
          title VARCHAR(128),
          category VARCHAR(128),
          currency VARCHAR(12,2) NOT NULL,
          price DECIMAL(12,2) NOT NULL,
          date VARCHAR(128) NOT NULL,
          FOREIGN KEY (category) REFERENCES Categories (category_id),
          FOREIGN KEY (currency) REFERENCES Currencies (currency_id)
        )`,
          [],
          success,
          errorCallback('CREATE TABLE IF NOT EXISTS Transactions'),
        );
        if (!res.rows.length) {
          txn.executeSql(
            `
              INSERT INTO Currencies (title, symbol, position)
              VALUES
                ${data.currencies
                  .map(({ title, symbol, position }) => `("${title}", "${symbol}", "${position}")`)
                  .join(',')}
              `,
            [],
            success,
            errorCallback('INSERT INTO Categories'),
          );
          txn.executeSql(
            `
              INSERT INTO Categories (title, color, description)
              VALUES
                ${data.categories
                  .map(({ title, color, description }) => `("${title}", "${color}", "${description}")`)
                  .join(',')}
              `,
            [],
            success,
            errorCallback('INSERT INTO Categories'),
          );
          txn.executeSql(
            `
              INSERT INTO Transactions (title, category, price, date, currency)
              VALUES
                ${data.transactions
                  .map(
                    ({ title, category, price, date, currency }) =>
                      `("${title}", ${category}, "${price}", "${date}", ${currency})`,
                  )
                  .join(',')}
              `,
            [],
            success,
            errorCallback('INSERT INTO Transactions'),
          );
        }
      },
      errorCallback('SELECT name FROM sqlite_master'),
    );
  });
};
