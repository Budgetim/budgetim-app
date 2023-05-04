import React, { FC, useEffect, useState } from 'react';
import { TransactionModalContent } from '../TransactionModalContent';
import { Transaction } from '../../types';
import { useModalsDispatch, useModalsState } from '../../contexts/modals';
import { useEditTransaction, useGetTransactions } from '../../hooks/transactions';

export const EditTransactionModal: FC = () => {
  const { data } = useGetTransactions();
  const {
    transaction: { isVisible, id },
  } = useModalsState();
  const transaction = data?.find(item => item.id === id) as Transaction;
  const [title, setTitle] = useState(transaction?.title || '');
  const [price, setPrice] = useState(transaction?.price || '');
  const [categoryId, setCategoryId] = useState(transaction?.category?.id || null);
  const [currencyId, setCurrencyId] = useState(transaction?.currency?.id || null);
  const [date, setDate] = useState(new Date(transaction?.date) || new Date());
  const modalsDispatch = useModalsDispatch();
  const editTransaction = useEditTransaction();

  useEffect(() => {
    if (isVisible) {
      setTitle(transaction.title);
      setPrice(transaction.price);
      setCategoryId(transaction.category.id);
      setCurrencyId(transaction.currency.id);
      setDate(new Date(transaction.date));
    }
  }, [isVisible]);

  const closeModal = () => {
    modalsDispatch({ type: 'setTransactionModalVisible', payload: { isVisible: false } });
  };

  const onEdit = async () => {
    editTransaction({
      id,
      title,
      categoryId,
      price,
      date,
      currencyId,
    });
    closeModal();
  };

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
      visible={isVisible}
      onClose={closeModal}
      onSave={onEdit}
      isLoading={false}
    />
  );
};
