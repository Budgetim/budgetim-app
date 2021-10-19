import React, { FC, useEffect } from 'react';
import { useAppDispatch, useCategories, useUser } from '../../../../appContext';
import { FlatList, Text } from 'react-native';
import { getCategories } from '../../../../api/category/getCategories';
import { CategoryCard } from '../CategoryCard';

export const CategoriesList: FC = () => {
  const { data, isLoading, error } = useCategories();
  const dispatch = useAppDispatch();
  const { token } = useUser();

  const getData = async () => {
    getCategories((categories) => {
      dispatch({ type: 'setCategories', payload: { data: categories }});
    }, (error) => {
      dispatch({ type: 'setErrorCategories', payload: { error }});
    }, token);
  }
  useEffect(() => {
    getData();
  }, []);

  if (error) {
    return <Text>Ошибка</Text>
  }

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <CategoryCard key={item.id} {...item} />
      )}
    />
  );
};