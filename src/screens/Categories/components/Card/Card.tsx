import React, { FC } from 'react';
import { Alert } from 'react-native';
import { Category } from '../../../../types';

import { deleteCategory } from '../../../../api/categories/deleteCategory';
import { useCategoriesDispatch } from '../../../../contexts/categories';
import { CategoryCard } from '../../../../components/CategoryCard';
import { SwipeableRow } from '../../../../components/TransactionsList/components/SwipeableRow';
import i18n from 'i18n-js';

export const Card: FC<Category> = props => {
  const { title, color, description, id } = props;
  const dispatch = useCategoriesDispatch();

  const onDelete = async () => {
    //
    try {
      const result = await deleteCategory(id);
      console.log(result, 'rrress');
      dispatch({ type: 'deleteCategory', payload: { id } });
    } catch (error) {
      Alert.alert(i18n.t('common.state.error'), error);
    }
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
