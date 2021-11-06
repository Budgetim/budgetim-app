import React, { FC, useEffect, useState } from 'react';
import { useTheme } from 'styled-components/native';

import { useUser } from '../../../../contexts/app';
import { useCategoriesDispatch, useCategoriesState } from '../../../../contexts/categories';

import { Category, CategoryWrapper, Categories, Circle, ShowMoreWrapper, ShowMoreText } from './styled';
import { CategoriesListProps } from './types';
import { getCategories } from '../../../../api/category/getCategories';
import { TextVariant } from '../../../TextVariant';
import { Loader } from '../../../Loader';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const CategoriesList: FC<CategoriesListProps> = ({ activeCategoryId, setCategoryId }) => {
  const { data, error, isLoading } = useCategoriesState();
  const [showAll, setShowAll] = useState(false);
  const { colors: { systemGray05, textPrimary } } = useTheme();
  const { token } = useUser();
  const dispatch = useCategoriesDispatch();

  const getData = async () => {
    try {
      const categories = await getCategories(token);
      dispatch({ type: 'setData', payload: { data: categories }})
    } catch (error) {
      dispatch({ type: 'setError', payload: { error }})
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (error) {
    return <TextVariant variant="bodyRegular">{error}</TextVariant>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Categories>
      {data.slice(0, showAll ? data.length : 5).map((item, index, array) => {
        return (
          <CategoryWrapper
            key={item.id}
            hasBorder={index !== array.length - 1}
            onPress={() => {
              setCategoryId(item.id);
            }}
          >
            <Circle bg={item.color || systemGray05} />
            <Category isSelected={item.id === activeCategoryId} variant="subheadlineRegular">
              {item.title}
            </Category>
          </CategoryWrapper>
        );
      })}
      <ShowMoreWrapper onPress={() => setShowAll(!showAll)}>
        <Ionicons name={showAll ? 'chevron-up-outline' : 'chevron-down-outline'} color={textPrimary} size={17} />
        <ShowMoreText variant="subheadlineRegular">
          {showAll ? 'hide' : 'show more'}
        </ShowMoreText>
      </ShowMoreWrapper>
    </Categories>
  );
};
