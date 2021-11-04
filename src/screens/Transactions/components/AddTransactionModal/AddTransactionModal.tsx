import React, { FC, useEffect, useState } from 'react';
import { useUser } from '../../../../contexts/app';
import { addTransaction } from '../../../../api/transaction/addTransaction';
import { AddTransactionModalProps } from './types';
import { useTransactionsDispatch } from '../../../../contexts/transactions';
import { TransactionModalContent } from '../../../../components/TransactionModalContent';

export const AddTransactionModal: FC<AddTransactionModalProps> = (props) => {
  const { visible, setVisible } = props;
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('0.00');
  const [categoryId, setCategoryId] = useState<null | number>(null);
  const [date, setDate] = useState(new Date());
  const dispatch = useTransactionsDispatch();
  const { token } = useUser();

  useEffect(() => {
    if (visible) {
      setTitle('');
      setPrice('0.00');
      setCategoryId(null);
      setDate(new Date());
    }
  }, [visible]);

  const onEdit = async () => {
    const transaction = await addTransaction({ title, categoryId, price, date }, token);
    dispatch({ type: 'addTransaction', payload: { transaction }});
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
      visible={visible}
      onClose={() => setVisible(false)}
      onSave={onEdit}
    />
  );
};
