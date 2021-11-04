import React, { FC, useEffect, useState } from 'react';
import { useUser } from '../../contexts/app';
import { editTransaction } from '../../api/transaction/editTransaction';
import { useTransactionsDispatch, useTransactionsState } from '../../contexts/transactions';
import { TransactionModalContent } from '../TransactionModalContent';

export const EditTransactionModal: FC = () => {
  const { modal: { isVisible, id }, data } = useTransactionsState();
  const transaction = data.find(item => item.id === id);

  if (id === null || !transaction) {
    return null;
  }

  const [title, setTitle] = useState(transaction.title);
  const [price, setPrice] = useState(transaction.price);
  const [categoryId, setCategoryId] = useState(transaction.category?.id || null);
  const [date, setDate] = useState(new Date(transaction.date));
  const dispatch = useTransactionsDispatch();
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
    dispatch({ type: 'setModalVisible', payload: { isVisible: false } });
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
