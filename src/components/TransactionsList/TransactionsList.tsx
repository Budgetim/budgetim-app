import React, { FC, useEffect } from 'react';

import { useUser } from '../../contexts/app';
import { getTransactions } from '../../api/transaction/getTransactions';
import { TransactionGroups } from './components/TransactionGroups';
import { TextVariant } from '../TextVariant';
import { useTransactionsState, useTransactionsDispatch } from '../../contexts/transactions';

interface TransactionsListProps {
  category?: number;
}

export const TransactionsList: FC<TransactionsListProps> = ({ category }) => {
  const { data, isLoading, error } = useTransactionsState();
  const dispatch = useTransactionsDispatch();
  const { token } = useUser();

  const getData = async () => {
    try {
      const transactions = await getTransactions({ year: 2021, month: 10, category }, token);
      dispatch({ type: 'setData', payload: { data: transactions }});
    } catch (error) {
      dispatch({ type: 'setError', payload: { error }});
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (error) {
    return <TextVariant variant="bodyRegular">{error}</TextVariant>
  }

  if (isLoading) {
    return <TextVariant variant="bodyRegular">Loading...</TextVariant>
  }

  return (
    <TransactionGroups data={data} />
  );
};
