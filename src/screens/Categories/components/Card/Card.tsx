import React, { FC, useEffect } from 'react';
import { Alert } from 'react-native';
import { Category } from '../../../../types';
import { CategoryCard } from '../../../../components/CategoryCard';
import { SwipeableRow } from '../../../../components/TransactionsList/components/SwipeableRow';
import i18n from 'i18n-js';
import { useDeleteCategory } from '../../../../hooks/categories';
import { useModalsDispatch } from '../../../../contexts/modals';

export const Card: FC<Category> = props => {
  const { title, color, description, id } = props;
  const dispatch = useModalsDispatch();
  const { mutate: deleteCategory, isError, error } = useDeleteCategory();

  useEffect(() => {
    if (isError) {
      Alert.alert(i18n.t('common.state.error'), error);
    }
  }, [isError]);

  const onDelete = () => {
    deleteCategory(id);
  };

  return (
    <SwipeableRow onPress={onDelete}>
      <CategoryCard
        onPress={() => {
          dispatch({ type: 'setCategoryModal', payload: { id } });
        }}
        title={title}
        description={description}
        tagColor={color}
      />
    </SwipeableRow>
  );
};
