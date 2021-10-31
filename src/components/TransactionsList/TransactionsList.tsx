import React, { FC, useEffect } from 'react';

import { useUser } from '../../contexts/app';
import { getTransactions } from '../../api/transaction/getTransactions';
import { TransactionGroups } from './components/TransactionGroups';
import { TextVariant } from '../TextVariant';
import { useTransactionsState, useTransactionsDispatch } from '../../contexts/transactions';
import { Loader } from '../Loader';

interface TransactionsListProps {
  category?: number;
  month: number;
}

export const TransactionsList: FC<TransactionsListProps> = ({ category, month }) => {
  const { data, isLoading, error } = useTransactionsState();
  const dispatch = useTransactionsDispatch();
  const { token } = useUser();

  const getData = async () => {
    try {
      const transactions = await getTransactions({ year: 2021, month, category }, token);
      dispatch({ type: 'setData', payload: { data: transactions }});
    } catch (error) {
      dispatch({ type: 'setError', payload: { error }});
    }
  }

  useEffect(() => {
    getData();
  }, [month, category]);

  if (error) {
    return <TextVariant variant="bodyRegular">{error}</TextVariant>
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <TransactionGroups data={data} />
  );
};
