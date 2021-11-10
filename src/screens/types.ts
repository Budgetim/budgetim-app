export type StackParamList = {
  Login: undefined;
  CreateAccount: undefined;
  PasswordReset: undefined;
  Transactions: undefined;
  Categories: undefined;
  Settings: undefined;
  Personal: undefined;
  Statistics: undefined;
  TransactionsByCategory: {
    category: number;
    categoryTitle: string;
    month: number;
    year: number;
  };
};