import React, { FC, useEffect } from 'react';

import { useAppDispatch, useTransactions, useUser } from '../../../../appContext';
import { getTransactions } from '../../../../api/transaction/getTransactions';
import { TransactionGroups } from '../../../../components/TransactionGroups';
import { TextVariant } from '../../../../components/TextVariant';

export const TransactionsList: FC = () => {
  const { data, isLoading, error } = useTransactions();
  const dispatch = useAppDispatch();
  const { token } = useUser();

  const getData = async () => {
    try {
      const transactions = await getTransactions({ year: 2021, month: 10 } , token);
      dispatch({ type: 'setTransactions', payload: { data: transactions }})
    } catch (error) {
      dispatch({ type: 'setErrorTransactions', payload: { error }})
    }
  }

  useEffect(() => {
    void getData();
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