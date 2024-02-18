import React from 'react';
import { useModalsDispatch, useModalsState } from '../../contexts/modals';
import { ModalWrapper } from '../ModalWrapper';
import { CurrencyFetcher } from './components/CurrencyFetcher';
import { EmptyCurrencyFetcher } from './components/EmptyCurrencyFetcher';

export const CurrencyModal = () => {
  const {
    currency: { isVisible, id },
  } = useModalsState();
  const modalsDispatch = useModalsDispatch();

  const closeModal = () => {
    modalsDispatch({ type: 'closeCurrencyModal', payload: undefined });
  };

  return (
    <ModalWrapper isVisible={isVisible} onClose={closeModal} height="shirt">
      {id ? <CurrencyFetcher id={id} /> : <EmptyCurrencyFetcher />}
    </ModalWrapper>
  );
};
