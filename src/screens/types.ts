export type StackParamList = {
  Transactions: undefined;
  Statistics: undefined;
  StatisticsByDates: undefined;
  Settings: undefined;
  TransactionsByCategory: {
    category: number | null;
    categoryTitle: string | null;
    month: number;
    year: number;
  };
};
