import React, { FC, useEffect } from 'react';

import { useUserState } from '../../contexts/user';
import { getTransactions } from '../../api/transactions/getTransactions';
import { ErrorMessage } from '../ErrorMessage';
import { TransactionGroups } from './components/TransactionGroups';
import { useTransactionsState, useTransactionsDispatch } from '../../contexts/transactions';
import { Loader } from '../Loader';
import { useIsFocused } from '@react-navigation/native';
import { useErrorHandler } from '../../hooks/useErrorHandler';

interface TransactionsListProps {
  category?: number | null;
  month?: number;
  year?: number;
}

export const TransactionsList: FC<TransactionsListProps> = ({ category, month, year }) => {
  const { isLoading, error } = useTransactionsState();
  const dispatch = useTransactionsDispatch();
  const { token } = useUserState();
  const isFocused = useIsFocused();

  useErrorHandler(error);

  useEffect(() => {
    if (isFocused) {
      const getData = async () => {
        try {
          const transactions = await getTransactions({ year, month, category }, token);
          dispatch({ type: 'setData', payload: { data: transactions } });
        } catch (error) {
          dispatch({ type: 'setError', payload: { error } });
        }
      };
      getData();
    }
  }, [month, category, isFocused]);

  if (!isFocused) {
    return null;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return <TransactionGroups />;
};
