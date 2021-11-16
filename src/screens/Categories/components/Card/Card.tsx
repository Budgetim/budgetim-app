import React, { FC, useState } from 'react';
import Swipeout from 'react-native-swipeout';
import i18n from 'i18n-js';
import { useTheme } from 'styled-components/native';

import { Category } from '../../../../types';

import { useUserState } from '../../../../contexts/user';

import { deleteCategory } from '../../../../api/categories/deleteCategory';
import { useCategoriesDispatch } from '../../../../contexts/categories';
import { CategoryCard } from '../../../../components/CategoryCard';
import { useErrorHandler } from '../../../../hooks/useErrorHandler';

export const Card: FC<Category> = (props) => {
  const { title, color, description, id } = props;
  const { colors: { bgPrimary, systemRed, textPrimary }} = useTheme();
  const dispatch = useCategoriesDispatch();
  const { token } = useUserState();
  const [error, setError] = useState(null);

  useErrorHandler(error);

  const onDelete = async () => {
    try {
      await deleteCategory(id, token);
      dispatch({ type: 'deleteCategory', payload: { id }});
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Swipeout
      backgroundColor={bgPrimary}
      right={[{
        text: i18n.t('common.action.delete'),
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
