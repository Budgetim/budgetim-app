import React, { FC, useEffect, useState } from 'react';
import { editCategory } from '../../../../api/categories/editCategory';
import { useCategoriesDispatch, useCategoriesState } from '../../../../contexts/categories';
import { CategoryModalContent } from '../CategoryModalContent';

export const EditCategoryModal: FC = () => {
  const {
    modal: { isVisible, id },
    data,
  } = useCategoriesState();
  const category = data.find(item => item.id === id);
  const [title, setTitle] = useState(category?.title);
  const [description, setDescription] = useState(category?.description);
  const [color, setColor] = useState(category?.color);
  const dispatch = useCategoriesDispatch();

  useEffect(() => {
    if (isVisible) {
      setTitle(category?.title);
      setDescription(category?.description);
      setColor(category?.color);
    }
  }, [isVisible]);

  if (id === null || !category) {
    return null;
  }

  const onClose = () => {
    dispatch({ type: 'setModalVisible', payload: { isVisible: false } });
  };

  const onEdit = async () => {
    const category = await editCategory({ id, description, title, color });
    dispatch({ type: 'editCategory', payload: { category } });
  };

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
