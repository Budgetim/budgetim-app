import React from 'react';
import { useModalsDispatch, useModalsState } from '../../contexts/modals';
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

  if (id) {
    return <CategoryFetcher id={id} isVisible={isVisible} onClose={closeModal} />;
  }

  return <EmptyCategoryFetcher isVisible={isVisible} onClose={closeModal} />;
};
