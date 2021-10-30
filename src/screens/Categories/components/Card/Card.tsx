import React, { FC, useState } from 'react';
import Swipeout from 'react-native-swipeout';

import { Category } from '../../../../types';

import { useUser } from '../../../../contexts/app';

import { useTheme } from 'styled-components/native';
import { deleteCategory } from '../../../../api/category/deleteCategory';
import { CategoryModal } from '../CategoryModal';
import { useCategoriesDispatch } from '../../../../contexts/categories';
import { CategoryCard } from '../../../../components/CategoryCard';

export const Card: FC<Category> = (props) => {
  const { title, color, description, id } = props;
  const [modalVisible, setModalVisible] = useState(false);
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
        onPress={() => setModalVisible(true)}
        title={title}
        description={description}
        tagColor={color}
      />
      <CategoryModal visible={modalVisible} setVisible={setModalVisible} category={props} />
    </Swipeout>
  );
};
