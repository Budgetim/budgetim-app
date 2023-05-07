import React, { useEffect, useState } from 'react';
import { useAddCategory, useEditCategory } from '../../../../hooks/categories';
import { CategoryModalContent } from '../CategoryModalContent';

export const EmptyCategoryFetcher = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const { mutate: addCategory, isSuccess, data: categoryId } = useAddCategory();
  const editCategory = useEditCategory();

  useEffect(() => {
    if (isSuccess) {
      editCategory({
        id: categoryId,
        title,
        description,
        color,
      });
    }
  }, [title, description, color, isSuccess]);

  useEffect(() => {
    addCategory({ title, description, color });
  }, []);

  return (
    <CategoryModalContent
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      color={color}
      setColor={setColor}
    />
  );
};
