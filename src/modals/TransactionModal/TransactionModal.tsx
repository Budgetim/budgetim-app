import React from 'react';
import { useModalsDispatch, useModalsState } from '../../contexts/modals';
import { ModalWrapper } from '../ModalWrapper';
import { TransactionFetcher } from './components/TransactionFetcher';
import { EmptyTransactionFetcher } from './components/EmptyTransactionFetcher';

export const TransactionModal = () => {
  const {
    transaction: { isVisible, id },
  } = useModalsState();

  const modalsDispatch = useModalsDispatch();

  const closeModal = () => {
    modalsDispatch({ type: 'closeTransactionModal', payload: undefined });
  };

  return (
    <ModalWrapper isVisible={isVisible} onClose={closeModal}>
      {id ? <TransactionFetcher id={id} /> : <EmptyTransactionFetcher />}
    </ModalWrapper>
  );
};
