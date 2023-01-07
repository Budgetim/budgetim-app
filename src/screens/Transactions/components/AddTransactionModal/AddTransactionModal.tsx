import React, { FC, useEffect, useState } from 'react';
import { addTransaction } from '../../../../api/transactions/addTransaction';
import { AddTransactionModalProps } from './types';
import { useTransactionsDispatch } from '../../../../contexts/transactions';
import { TransactionModalContent } from '../../../../components/TransactionModalContent';
import { useCurrenciesState } from '../../../../contexts/currencies';
import { useCategoriesState } from '../../../../contexts/categories';

export const AddTransactionModal: FC<AddTransactionModalProps> = props => {
  const { visible, setVisible } = props;
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState<null | number>(null);
  const [currencyId, setCurrencyId] = useState<null | number>(null);
  const [isLading, setIsLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const dispatch = useTransactionsDispatch();
  const { data: currencies } = useCurrenciesState();
  const { data: categories } = useCategoriesState();

  useEffect(() => {
    if (visible) {
      setTitle('');
      setPrice('');
      setCategoryId(categories?.[0].id);
      setCurrencyId(currencies?.[0].id);
      setDate(new Date());
    }
  }, [visible]);

  const onAdd = async () => {
    setIsLoading(true);
    try {
      const transaction = await addTransaction({ title, categoryId, price, date, currencyId });
      dispatch({ type: 'addTransaction', payload: { transaction } });
    } finally {
      setIsLoading(false);
      setVisible(false);
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
      visible={visible}
      onClose={() => setVisible(false)}
      onSave={onAdd}
      isLoading={isLading}
    />
  );
};
