import React, { FC } from 'react';
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
  const deleteCategory = useDeleteCategory();

  const onDelete = async () => {
    try {
      await deleteCategory(id);
    } catch (error) {
      Alert.alert(i18n.t('common.state.error'), error);
    }
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
