import React, { useEffect, useState, FC, useRef } from 'react';
import { useAddCategory, useDeleteCategory, useEditCategory } from '../../../../hooks/categories';
import { CategoryModalContent } from '../CategoryModalContent';
import { ModalWrapper } from '../../../ModalWrapper';
import i18n from 'i18n-js';

type EmptyCategoryFetcherProps = {
  isVisible: boolean;
  onClose: () => void;
};

export const EmptyCategoryFetcher: FC<EmptyCategoryFetcherProps> = ({ isVisible, onClose }) => {
  const added = useRef(false); // добалено ли уже в базу
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [action, setAction] = useState<'close' | 'done'>('close');
  const { mutate: addCategory, isSuccess: isSuccessAdd, data: addedCategoryId } = useAddCategory();
  const { mutate: deleteCategory } = useDeleteCategory();
  const editCategory = useEditCategory();

  useEffect(() => {
    if (title || description || color) {
      setAction('done');
      if (!added.current) {
        addCategory({ title, description, color });
        added.current = true;
      } else {
        if (isSuccessAdd) {
          editCategory({
            id: addedCategoryId as number,
            title,
            description,
            color,
          });
        }
      }
    } else {
      setAction('close');
    }
  }, [title, description, color]);

  const onCloseHandler = () => {
    onClose();
    setAction('close');
    setTitle('');
    setDescription('');
    setColor('');
    added.current = false;
  };

  const actionHandler = () => {
    if (action === 'close' && added.current) {
      deleteCategory(addedCategoryId as number);
    }
    onCloseHandler();
  };

  return (
    <ModalWrapper
      isVisible={isVisible}
      onClose={onCloseHandler}
      action={actionHandler}
      actionText={i18n.t(`common.action.${action}`)}
    >
      <CategoryModalContent
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        color={color}
        setColor={setColor}
      />
    </ModalWrapper>
  );
};
