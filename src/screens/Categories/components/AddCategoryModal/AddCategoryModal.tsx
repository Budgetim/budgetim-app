import React, { FC, useEffect, useState } from 'react';
import { CategoryModalProps } from './types';
import { CategoryModalContent } from '../CategoryModalContent';
import { useAddCategory } from '../../../../hooks/categories';

export const AddCategoryModal: FC<CategoryModalProps> = props => {
  const { visible, setVisible } = props;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const addCategory = useAddCategory();

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
    await addCategory({ description, title, color });
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
