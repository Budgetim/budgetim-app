import React from 'react';
import { useModalsDispatch, useModalsState } from '../../contexts/modals';
import { ModalWrapper } from '../ModalWrapper';
import { CategoryFetcher } from './components/CategoryFetcher';
import { EmptyCategoryFetcher } from './components/EmptyCategoryFetcher';

export const CategoryModal = () => {
  const {
    category: { isVisible, id },
  } = useModalsState();
  const modalsDispatch = useModalsDispatch();

  const closeModal = () => {
    modalsDispatch({ type: 'closeCategoryModal', payload: undefined });
  };

  return (
    <ModalWrapper isVisible={isVisible} onClose={closeModal}>
      {id ? <CategoryFetcher id={id} /> : <EmptyCategoryFetcher />}
    </ModalWrapper>
  );
};
