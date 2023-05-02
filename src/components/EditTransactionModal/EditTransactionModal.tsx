import React, { FC, useEffect, useState } from 'react';
import { editTransaction } from '../../api/transactions/editTransaction';
import { TransactionModalContent } from '../TransactionModalContent';
import { Transaction } from '../../types';
import { useModalsDispatch, useModalsState } from '../../contexts/modals';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../../App';
import { getTransactions } from '../../api/transactions/getTransactions';

export const EditTransactionModal: FC = () => {
  const { data } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => getTransactions({}),
  });
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

  const mutation = useMutation({
    mutationFn: editTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });

  const onEdit = async () => {
    mutation.mutate({
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
