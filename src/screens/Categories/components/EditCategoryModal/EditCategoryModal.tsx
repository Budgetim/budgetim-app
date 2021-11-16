import React, { FC, useEffect, useState } from 'react';

import { useUserState } from '../../../../contexts/user';
import { editCategory } from '../../../../api/categories/editCategory';
import { useCategoriesDispatch, useCategoriesState } from '../../../../contexts/categories';
import { CategoryModalContent } from '../CategoryModalContent';
import { useErrorHandler } from '../../../../hooks/useErrorHandler';

export const EditCategoryModal: FC = () => {
  const { modal: { isVisible, id }, data } = useCategoriesState();
  const category = data.find(item => item.id === id);

  if (id === null || !category) {
    return null;
  }

  const [error, setError] = useState(null);
  const [title, setTitle] = useState(category.title);
  const [description, setDescription] = useState(category.description);
  const [color, setColor] = useState(category.color);
  const dispatch = useCategoriesDispatch();
  const { token } = useUserState();

  useErrorHandler(error);

  useEffect(() => {
    if (isVisible) {
      setTitle(category.title);
      setDescription(category.description);
      setColor(category.color);
    }
  }, [isVisible]);

  const onClose = () => {
    dispatch({ type: 'setModalVisible', payload: { isVisible: false } });
  }

  const onEdit = async () => {
    try {
      const category = await editCategory({ id, description, title, color }, token);
      dispatch({ type: 'editCategory', payload: { category } });
    } catch (error) {
      setError(error);
    }
  }

  return (
    <CategoryModalContent
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      color={color}
      setColor={setColor}
      visible={isVisible}
      onClose={onClose}
      onSave={onEdit}
    />
  );
};
