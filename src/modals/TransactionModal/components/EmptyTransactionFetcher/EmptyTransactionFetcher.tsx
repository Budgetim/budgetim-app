import React, { FC, useEffect, useRef, useState } from 'react';
import { TransactionModalContent } from '../TransactionModalContent';
import { useAddTransaction, useDeleteTransaction, useEditTransaction } from '../../../../hooks/transactions';
import { useGetCurrencies } from '../../../../hooks/currencies';
import { useGetCategories } from '../../../../hooks/categories';
import { Loader } from '../../../../components/Loader';
import { isString } from 'lodash';
import i18n from 'i18n-js';
import { ModalWrapper } from '../../../ModalWrapper';

interface ContentProps {
  categoryId: number | null;
  currencyId: number | null;
  isVisible: boolean;
  onClose: () => void;
}

export const Content: FC<ContentProps> = props => {
  const added = useRef(false); // добалено ли уже в базу

  const [action, setAction] = useState<'close' | 'done'>('close');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [categoryId, setCategoryId] = useState(props.categoryId);
  const [currencyId, setCurrencyId] = useState(props.currencyId);
  const [date, setDate] = useState(new Date());
  const { mutate: addTransaction, isSuccess: isSuccessAdd, data: addedTransactionId } = useAddTransaction();
  const editTransaction = useEditTransaction();
  const deleteTransaction = useDeleteTransaction();

  const { isVisible, onClose } = props;

  useEffect(() => {
    if (title || price) {
      setAction('done');
      if (!added.current) {
        addTransaction({ title, categoryId, price: 0, date, currencyId });
        added.current = true;
      } else {
        if (isSuccessAdd) {
          editTransaction({
            id: addedTransactionId,
            title,
            categoryId,
            price: isString(price) ? 0 : price,
            date,
            currencyId,
          });
        }
      }
    } else {
      setAction('close');
    }
  }, [title, categoryId, price, date, currencyId]);

  const onCloseHandler = () => {
    onClose();
    setAction('close');
    setTitle('');
    setPrice('');
    added.current = false;
  };

  const actionHandler = () => {
    if (action === 'close' && added.current) {
      deleteTransaction(addedTransactionId as number);
    }
    onCloseHandler();
  };

  return (
    <ModalWrapper
      isVisible={isVisible}
      onClose={onCloseHandler}
      action={actionHandler}
      actionText={i18n.t(`common.action.${action}`)}
    >
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
    </ModalWrapper>
  );
};

type EmptyTransactionFetcherProps = {
  isVisible: boolean;
  onClose: () => void;
};

export const EmptyTransactionFetcher: FC<EmptyTransactionFetcherProps> = props => {
  const { data: currencies, isLoading: isLoadingCurrencies } = useGetCurrencies();
  const { data: categories, isLoading: isLoadingCategories } = useGetCategories();

  if (isLoadingCurrencies || isLoadingCategories) {
    return <Loader />;
  }

  return <Content {...props} categoryId={categories?.[0]?.id || null} currencyId={currencies?.[0]?.id || null} />;
};
