import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppState } from '../../../../appContext';
import { FlatList, Text } from 'react-native';
import { getCategories } from '../../../../api/category/getCategories';
import { CategoryCard } from '../CategoryCard';

export const CategoriesList: FC = () => {
  const { categories, isLoadingCategories, errorCategories } = useAppState();
  const dispatch = useAppDispatch();

  const getData = async () => {
    getCategories((categories) => {
      dispatch({ type: 'setCategories', payload: { data: categories }});
    }, (error) => {
      dispatch({ type: 'setErrorCategories', payload: { error }});
    });
  }
  useEffect(() => {
    getData();
  }, []);

  if (errorCategories) {
    return <Text>{errorCategories}</Text>
  }

  if (isLoadingCategories) {
    return <Text>Loading...</Text>
  }

  return (
    <FlatList
      data={categories}
      renderItem={({ item }) => (
        <CategoryCard key={item.id} {...item} />
      )}
    />
  );
};