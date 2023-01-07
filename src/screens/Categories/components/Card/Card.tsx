import React, { FC } from 'react';
import { Category } from '../../../../types';

import { deleteCategory } from '../../../../api/categories/deleteCategory';
import { useCategoriesDispatch } from '../../../../contexts/categories';
import { CategoryCard } from '../../../../components/CategoryCard';
import { SwipeableRow } from '../../../../components/TransactionsList/components/SwipeableRow';

export const Card: FC<Category> = props => {
  const { title, color, description, id } = props;
  const dispatch = useCategoriesDispatch();

  const onDelete = async () => {
    await deleteCategory(id);
    dispatch({ type: 'deleteCategory', payload: { id } });
  };

  return (
    <SwipeableRow onPress={onDelete}>
      <CategoryCard
        onPress={() => {
          dispatch({ type: 'setModalVisible', payload: { isVisible: true } });
          dispatch({ type: 'setModalCategoryId', payload: { id } });
        }}
        title={title}
        description={description}
        tagColor={color}
      />
    </SwipeableRow>
  );
};
