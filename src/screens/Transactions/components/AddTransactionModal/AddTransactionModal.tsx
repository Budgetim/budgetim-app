import React, { FC, useEffect, useState } from 'react';
import { useUserState } from '../../../../contexts/user';
import { addTransaction } from '../../../../api/transaction/addTransaction';
import { AddTransactionModalProps } from './types';
import { useTransactionsDispatch } from '../../../../contexts/transactions';
import { TransactionModalContent } from '../../../../components/TransactionModalContent';

export const AddTransactionModal: FC<AddTransactionModalProps> = (props) => {
  const { visible, setVisible } = props;
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState<null | number>(null);
  const [isLading, setIsLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const dispatch = useTransactionsDispatch();
  const { token } = useUserState();

  useEffect(() => {
    if (visible) {
      setTitle('');
      setPrice('');
      setCategoryId(null);
      setDate(new Date());
    }
  }, [visible]);

  const onAdd = async () => {
    setIsLoading(true);
    const transaction = await addTransaction({ title, categoryId, price, date }, token);
    dispatch({ type: 'addTransaction', payload: { transaction }});
    setIsLoading(false);
    setVisible(false);
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
      onSave={onAdd}
      isLoading={isLading}
    />
  );
};
