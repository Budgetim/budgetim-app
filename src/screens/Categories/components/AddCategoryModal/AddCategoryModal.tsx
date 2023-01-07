import React, { FC, useEffect, useState } from 'react';
import { CategoryModalProps } from './types';
import { addCategory } from '../../../../api/categories/addCategory';
import { useCategoriesDispatch } from '../../../../contexts/categories';
import { CategoryModalContent } from '../CategoryModalContent';

export const AddCategoryModal: FC<CategoryModalProps> = props => {
  const { visible, setVisible } = props;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const dispatch = useCategoriesDispatch();

  useEffect(() => {
    if (visible) {
      setTitle('');
      setDescription('');
      setColor('');
    }
  }, [visible]);

  const onClose = () => {
    setVisible(false);
  };

  const onAdd = async () => {
    const category = await addCategory({ description, title, color });
    dispatch({ type: 'addCategory', payload: { category } });
  };

  if (!visible) {
    return null;
  }

  return (
    <CategoryModalContent
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      color={color}
      setColor={setColor}
      visible={visible}
      onClose={onClose}
      onSave={onAdd}
    />
  );
};
