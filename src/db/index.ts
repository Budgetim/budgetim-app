import SQLite from 'react-native-sqlite-2';

export const db = SQLite.openDatabase('budgetim.db', '1.0', '', 200000);
