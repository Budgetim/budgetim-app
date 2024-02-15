export type StackParamList = {
  Transactions: undefined;
  Statistics: undefined;
  StatisticsByDates: undefined;
  Settings: undefined;
  TransactionsByCategory: {
    category: number;
    categoryTitle: string;
    month: number;
    year: number;
  };
};
