import React, { FC } from 'react';
import Swipeout from 'react-native-swipeout';

import { Category } from '../../../../types';

import { useUser } from '../../../../contexts/app';

import { useTheme } from 'styled-components/native';
import { deleteCategory } from '../../../../api/category/deleteCategory';
import { useCategoriesDispatch } from '../../../../contexts/categories';
import { CategoryCard } from '../../../../components/CategoryCard';

export const Card: FC<Category> = (props) => {
  const { title, color, description, id } = props;
  const { colors: { bgPrimary, systemRed, textPrimary }} = useTheme();
  const dispatch = useCategoriesDispatch();
  const { token } = useUser();

  const onDelete = async () => {
    await deleteCategory(id, token);
    dispatch({ type: 'deleteCategory', payload: { id }});
  };

  return (
    <Swipeout
      backgroundColor={bgPrimary}
      right={[{
        text: 'удалить',
        color: textPrimary,
        backgroundColor: systemRed,
        onPress: onDelete,
      }]}
    >
      <CategoryCard
        onPress={() => {
          dispatch({ type: 'setModalVisible', payload: { isVisible: true }});
          dispatch({ type: 'setModalCategoryId', payload: { id }});
        }}
        title={title}
        description={description}
        tagColor={color}
      />
    </Swipeout>
  );
};
