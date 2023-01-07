export type StackParamList = {
  Transactions: undefined;
  Categories: undefined;
  Statistics: undefined;
  StatisticsByDates: undefined;
  TransactionsByCategory: {
    category: number;
    categoryTitle: string;
    month: number;
    year: number;
  };
};
