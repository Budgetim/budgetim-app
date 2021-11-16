import React, { FC, useEffect, useState } from 'react';
import { useUserState } from '../../../../contexts/user';
import { CategoryModalProps } from './types';
import { addCategory } from '../../../../api/categories/addCategory';
import { useCategoriesDispatch } from '../../../../contexts/categories';
import { CategoryModalContent } from '../CategoryModalContent';
import { useErrorHandler } from '../../../../hooks/useErrorHandler';

export const AddCategoryModal: FC<CategoryModalProps> = (props) => {
  const { visible, setVisible } = props;
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);
  const [description, setDescription] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const dispatch = useCategoriesDispatch();
  const { token } = useUserState();

  useErrorHandler(error);

  useEffect(() => {
    if (visible) {
      setTitle('');
      setDescription('');
      setColor('');
    }
  }, [visible]);

  const onClose = () => {
    setVisible(false);
  }

  const onAdd = async () => {
    try {
      const category = await addCategory({ description, title, color }, token);
      dispatch({ type: 'addCategory', payload: { category } });
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
      visible={visible}
      onClose={onClose}
      onSave={onAdd}
    />
  );
};
