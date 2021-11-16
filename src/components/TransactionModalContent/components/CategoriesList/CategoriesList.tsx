import React, { FC, useEffect, useState } from 'react';
import { useTheme } from 'styled-components/native';

import { useUserState } from '../../../../contexts/user';
import { useCategoriesDispatch, useCategoriesState } from '../../../../contexts/categories';

import { Wrapper, ShowMoreWrapper, ShowMoreText } from './styled';
import { CategoriesListProps } from './types';
import { getCategories } from '../../../../api/categories/getCategories';
import { TextVariant } from '../../../TextVariant';
import { Loader } from '../../../Loader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SelectList } from '../../../SelectList';
import { useErrorHandler } from '../../../../hooks/useErrorHandler';

export const CategoriesList: FC<CategoriesListProps> = ({ activeCategoryId, setCategoryId }) => {
  const { data, error, isLoading } = useCategoriesState();
  const [showAll, setShowAll] = useState(false);
  const { colors: { systemGray05, textPrimary, bgPrimary } } = useTheme();
  const { token } = useUserState();
  const dispatch = useCategoriesDispatch();

  useErrorHandler(error);

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
    <Wrapper>
      <SelectList
        backgroundColor={bgPrimary}
        onSelect={(id) => {
          setCategoryId(id);
        }}
        data={data.slice(0, showAll ? data.length : 6).map(item => {
          return {
            id: item.id,
            title: item.title,
            color: item.color || systemGray05,
            isActive: item.id === activeCategoryId,
          }
        })}
      />
      {!showAll && data.length > 6 && (
        <ShowMoreWrapper onPress={() => setShowAll(true)}>
          <Ionicons name={showAll ? 'chevron-up-outline' : 'chevron-down-outline'} color={textPrimary} size={17} />
          <ShowMoreText variant="subheadlineRegular">show more</ShowMoreText>
        </ShowMoreWrapper>
      )}
    </Wrapper>
  );
};
