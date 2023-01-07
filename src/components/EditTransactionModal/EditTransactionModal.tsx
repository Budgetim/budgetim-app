import React, { FC, useEffect, useState } from 'react';
import { editTransaction } from '../../api/transactions/editTransaction';
import { useTransactionsDispatch, useTransactionsState } from '../../contexts/transactions';
import { TransactionModalContent } from '../TransactionModalContent';
import { Transaction } from '../../types';
import { useModalsDispatch, useModalsState } from '../../contexts/modals';

export const EditTransactionModal: FC = () => {
  const { data } = useTransactionsState();
  const {
    transaction: { isVisible, id },
  } = useModalsState();
  const transaction = data.find(item => item.id === id) as Transaction;

  const [isLading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(transaction?.title || '');
  const [price, setPrice] = useState(transaction?.price || '');
  const [categoryId, setCategoryId] = useState(transaction?.category?.id || null);
  const [currencyId, setCurrencyId] = useState(transaction?.currency?.id || null);
  const [date, setDate] = useState(new Date(transaction?.date) || new Date());
  const dispatch = useTransactionsDispatch();
  const modalsDispatch = useModalsDispatch();

  useEffect(() => {
    if (isVisible) {
      setTitle(transaction.title);
      setPrice(transaction.price);
      setCategoryId(transaction.category?.id || null);
      setCurrencyId(transaction.currency?.id || null);
      setDate(new Date(transaction.date));
    }
  }, [isVisible]);

  const closeModal = () => {
    modalsDispatch({ type: 'setTransactionModalVisible', payload: { isVisible: false } });
  };

  const onEdit = async () => {
    setIsLoading(true);
    try {
      const transaction = await editTransaction({ id, title, categoryId, price, date, currencyId });
      dispatch({ type: 'editTransaction', payload: { transaction } });
    } catch (error) {
    } finally {
      setIsLoading(false);
      closeModal();
    }
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
      isLoading={isLading}
    />
  );
};
