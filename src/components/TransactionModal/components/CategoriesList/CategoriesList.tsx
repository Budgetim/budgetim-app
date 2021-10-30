import React, { FC, useEffect, useState } from 'react';
import { useTheme } from 'styled-components/native';

import { useUser } from '../../../../appContext';
import { useCategoriesDispatch, useCategoriesState } from '../../../../constexts/categories';

import { Category, CategoryWrapper, Categories, Circle } from './styled';
import { CategoriesListProps } from './types';
import { getCategories } from '../../../../api/category/getCategories';
import { TextVariant } from '../../../TextVariant';

export const CategoriesList: FC<CategoriesListProps> = ({ activeCategoryId, setCategoryId }) => {
  const { data, error, isLoading } = useCategoriesState();
  const [showAll, setShowAll] = useState(false);
  const { colors: { systemGray05 } } = useTheme();
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
    return <TextVariant variant="bodyRegular">{error}</TextVariant>
  }

  if (isLoading) {
    return <TextVariant variant="bodyRegular">Loading...</TextVariant>
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
      <CategoryWrapper hasBorder={false} onPress={() => setShowAll(!showAll)}>
        <Category isSelected={false} variant="subheadlineRegular">
          {showAll ? 'hide' : 'more'}
        </Category>
      </CategoryWrapper>
    </Categories>
  );
};
