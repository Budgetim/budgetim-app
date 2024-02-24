import React from 'react';
import { useModalsDispatch, useModalsState } from '../../contexts/modals';
import { ModalWrapper } from '../ModalWrapper';
import { EmptyCurrencyFetcher } from './components/EmptyCurrencyFetcher';
import i18n from 'i18n-js';

export const CurrencyModal = () => {
  const {
    currency: { isVisible },
  } = useModalsState();
  const modalsDispatch = useModalsDispatch();

  const closeModal = () => {
    modalsDispatch({ type: 'closeCurrencyModal', payload: undefined });
  };

  return (
    <ModalWrapper
      isVisible={isVisible}
      onClose={closeModal}
      action={closeModal}
      actionText={i18n.t('common.action.close')}
    >
      <EmptyCurrencyFetcher onClose={closeModal} />
    </ModalWrapper>
  );
};
