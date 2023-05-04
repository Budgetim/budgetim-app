import React, { FC, useEffect, useState } from 'react';
import { CategoryModalContent } from '../CategoryModalContent';
import { useEditCategory, useGetCategories } from '../../../../hooks/categories';
import { useModalsDispatch, useModalsState } from '../../../../contexts/modals';

export const EditCategoryModal: FC = () => {
  const {
    category: { isVisible, id },
  } = useModalsState();
  const { data } = useGetCategories();
  const category = data.find(item => item.id === id);
  const [title, setTitle] = useState(category?.title);
  const [description, setDescription] = useState(category?.description);
  const [color, setColor] = useState(category?.color);
  const dispatch = useModalsDispatch();
  const editCategory = useEditCategory();

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
    dispatch({ type: 'setCategoryModalVisible', payload: { isVisible: false } });
  };

  const onEdit = async () => {
    await editCategory({ id, description, title, color });
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
