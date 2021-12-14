import React, { FC, useEffect, useState } from 'react';
import { useTheme } from 'styled-components/native';
import i18n from 'i18n-js';
import { CATEGORY_COLOR_DEFAULT } from '../../../../constants';

import { useUserState } from '../../../../contexts/user';
import { useCategoriesDispatch, useCategoriesState } from '../../../../contexts/categories';

import { getCategories } from '../../../../api/categories/getCategories';
import { ArrowDownIcon } from '../../../../icons/ArrowDownIcon';
import { PlusCircleIcon } from '../../../../icons/PlusCircleIcon';
import { AddCategoryModal } from '../../../../screens/Categories/components/AddCategoryModal';
import { ErrorMessage } from '../../../ErrorMessage';
import { Loader } from '../../../Loader';
import { SelectList } from '../../../SelectList';
import { useErrorHandler } from '../../../../hooks/useErrorHandler';

import { Wrapper, ShowMoreWrapper, ShowMoreText, AddButton, AddText } from './styled';
import { CategoriesListProps } from './types';

export const CategoriesList: FC<CategoriesListProps> = ({ activeCategoryId, setCategoryId }) => {
  const { data, dataLoaded, error, isLoading } = useCategoriesState();
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const {
    colors: { systemGray05, textPrimary, bgPrimary, systemBlue },
  } = useTheme();
  const { token } = useUserState();
  const dispatch = useCategoriesDispatch();
  const { colors } = useTheme();

  useErrorHandler(error);

  const getData = async () => {
    try {
      const categories = await getCategories(token);
      dispatch({ type: 'setData', payload: { data: categories } });
    } catch (error) {
      dispatch({ type: 'setError', payload: { error } });
    }
  };

  useEffect(() => {
    if (!dataLoaded) {
      getData();
    }
  }, []);

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (isLoading) {
    return <Loader />;
  }

  const targetData = [
    ...data,
    {
      id: null,
      title: i18n.t('transactions.emptyCategory'),
      color: colors[CATEGORY_COLOR_DEFAULT],
      description: null,
    },
  ];

  return (
    <Wrapper>
      <SelectList
        backgroundColor={bgPrimary}
        onSelect={id => {
          setCategoryId(id);
        }}
        data={targetData.slice(0, showAll ? targetData.length : 6).map(item => {
          return {
            id: item.id,
            title: item.title,
            color: item.color || systemGray05,
            isActive: item.id === activeCategoryId,
          };
        })}
      />
      {!showAll && targetData.length > 6 && (
        <ShowMoreWrapper onPress={() => setShowAll(true)}>
          <ArrowDownIcon color={textPrimary} size={12} />
          <ShowMoreText variant="subheadlineRegular">{i18n.t('categories.action.more')}</ShowMoreText>
        </ShowMoreWrapper>
      )}
      <AddButton onPress={() => setCategoryModalVisible(true)}>
        <PlusCircleIcon color={systemBlue} size={24} />
        <AddText variant="subheadlineRegular">{i18n.t('categories.action.add')}</AddText>
      </AddButton>
      <AddCategoryModal visible={categoryModalVisible} setVisible={setCategoryModalVisible} />
    </Wrapper>
  );
};
