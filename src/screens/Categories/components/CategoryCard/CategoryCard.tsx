import React, { FC, useState } from 'react';
import Swipeout from 'react-native-swipeout';

import { Category } from '../../../../types';

import { useAppDispatch } from '../../../../appContext';
import { CardDetails } from '../../../../components/CardDetails';
import { CardButton } from '../../../../components/CardButton';

import { useTheme } from 'styled-components/native';
import { deleteCategory } from '../../../../api/category/deleteCategory';
import { CategoryModal } from '../CategoryModal';

export const CategoryCard: FC<Category> = (props) => {
  const { title, color, description, id} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const { colors: { bgPrimary, systemRed, textPrimary }} = useTheme();
  const dispatch = useAppDispatch();

  const onDelete = () => {
    deleteCategory(
      id,
      () => dispatch({ type: 'deleteCategory', payload: { id }})
    );
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
      <CardButton onPress={() => setModalVisible(true)}>
        <CardDetails
          title={description || 'нет описания'}
          subTitle={title}
          tagColor={color}
        />
      </CardButton>
      <CategoryModal visible={modalVisible} setVisible={setModalVisible} category={props} />
    </Swipeout>
  );
};
