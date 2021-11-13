import React, { FC, useEffect, useMemo } from 'react';

import { useUserState } from '../../contexts/user';
import { getTransactions } from '../../api/transaction/getTransactions';
import { TransactionGroups } from './components/TransactionGroups';
import { TextVariant } from '../TextVariant';
import { useTransactionsState, useTransactionsDispatch } from '../../contexts/transactions';
import { Loader } from '../Loader';
import { useIsFocused } from '@react-navigation/native';

interface TransactionsListProps {
  category?: number;
  month?: number;
  year?: number;
}

export const TransactionsList: FC<TransactionsListProps> = ({ category, month, year }) => {
  const { isLoading, error } = useTransactionsState();
  const dispatch = useTransactionsDispatch();
  const { token } = useUserState();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const getData = async () => {
        try {
          const transactions = await getTransactions({ year, month, category }, token);
          dispatch({ type: 'setData', payload: { data: transactions }});
        } catch (error) {
          dispatch({ type: 'setError', payload: { error }});
        }
      };
      getData();
    }
  }, [month, category, isFocused]);

  if (!isFocused) {
    return null;
  }

  if (error) {
    return <TextVariant variant="bodyRegular">{error}</TextVariant>
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <TransactionGroups />
  );
};
