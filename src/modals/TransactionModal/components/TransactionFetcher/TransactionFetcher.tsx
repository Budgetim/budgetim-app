import React, { FC, useEffect, useState } from 'react';
import { useEditTransaction, useGetTransaction } from '../../../../hooks/transactions';
import { Transaction } from '../../../../types';
import { TransactionModalContent } from '../TransactionModalContent';
import { Loader } from '../../../../components/Loader';
import i18n from 'i18n-js';
import { ErrorMessage } from '../../../../components/ErrorMessage';
import { useGetCurrencies } from '../../../../hooks/currencies';
import { useGetCategories } from '../../../../hooks/categories';

interface ContentProps {
  transaction: Transaction;
}

export const Content: FC<ContentProps> = ({ transaction }) => {
  const [title, setTitle] = useState(transaction.title);
  const [price, setPrice] = useState(transaction.price);
  const [categoryId, setCategoryId] = useState(transaction.category.id);
  const [currencyId, setCurrencyId] = useState(transaction.currency.id);
  const [date, setDate] = useState(new Date(transaction.date));
  const editTransaction = useEditTransaction();

  useEffect(() => {
    editTransaction({
      id: transaction.id,
      title,
      categoryId,
      price,
      date,
      currencyId,
    });
  }, [title, categoryId, price, date, currencyId]);

  return (
    <TransactionModalContent
      title={title}
      setTitle={setTitle}
      price={price}
      setPrice={setPrice}
      categoryId={categoryId}
      setCategoryId={setCategoryId}
      currencyId={currencyId}
      setCurrencyId={setCurrencyId}
      date={date}
      setDate={setDate}
    />
  );
};

interface TransactionFetcherProps {
  id: number;
}

export const TransactionFetcher: FC<TransactionFetcherProps> = ({ id }) => {
  const { data, isLoading, error } = useGetTransaction(id);
  const { isLoading: isLoadingCurrencies } = useGetCurrencies();
  const { isLoading: isLoadingCategories } = useGetCategories();

  if (isLoading || isLoadingCurrencies || isLoadingCategories) {
    return <Loader />;
  }

  if (error || !data) {
    return <ErrorMessage>{error || i18n.t('common.state.error')}</ErrorMessage>;
  }

  return <Content transaction={data} />;
};
