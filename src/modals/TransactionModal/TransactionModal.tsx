import React from 'react';
import { useModalsDispatch, useModalsState } from '../../contexts/modals';
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

  if (id) {
    return <TransactionFetcher id={id} isVisible={isVisible} onClose={closeModal} />;
  }

  return <EmptyTransactionFetcher isVisible={isVisible} onClose={closeModal} />;
};
