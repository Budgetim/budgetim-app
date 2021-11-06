import React, { FC, useEffect, useState } from 'react';
import { useUser } from '../../contexts/app';
import { editTransaction } from '../../api/transaction/editTransaction';
import { useTransactionsDispatch, useTransactionsState } from '../../contexts/transactions';
import { TransactionModalContent } from '../TransactionModalContent';
import { Transaction } from '../../types';
import { useModalsDispatch, useModalsState } from '../../contexts/modals';

export const EditTransactionModal: FC = () => {
  const { data } = useTransactionsState();
  const { transaction: { isVisible, id } } = useModalsState();
  const transaction = data.find(item => item.id === id) as Transaction;

  const [title, setTitle] = useState(transaction?.title || '');
  const [price, setPrice] = useState(transaction?.price || '0.00');
  const [categoryId, setCategoryId] = useState(transaction?.category?.id || null);
  const [date, setDate] = useState(new Date(transaction?.date) || new Date());
  const dispatch = useTransactionsDispatch();
  const modalsDispatch = useModalsDispatch();
  const { token } = useUser();

  useEffect(() => {
    if (isVisible) {
      setTitle(transaction.title);
      setPrice(transaction.price);
      setCategoryId(transaction.category?.id || null);
      setDate(new Date(transaction.date));
    }
  }, [isVisible]);

  const closeModal = () => {
    modalsDispatch({ type: 'setTransactionModalVisible', payload: { isVisible: false } });
  };

  const onEdit = async () => {
    const transaction = await editTransaction({ id, title, categoryId, price, date }, token);
    dispatch({ type: 'editTransaction', payload: { transaction }});
  }

  return (
    <TransactionModalContent
      title={title}
      setTitle={setTitle}
      price={price}
      setPrice={setPrice}
      categoryId={categoryId}
      setCategoryId={setCategoryId}
      date={date}
      setDate={setDate}
      visible={isVisible}
      onClose={closeModal}
      onSave={onEdit}
    />
  );
};
