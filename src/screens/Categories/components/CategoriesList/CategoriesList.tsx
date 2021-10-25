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
    try {
      const categories = await getCategories(token);
      dispatch({ type: 'setCategories', payload: { data: categories }})
    } catch (error) {
      dispatch({ type: 'setErrorCategories', payload: { error }})
    }
  };

  useEffect(() => {
    void getData();
  }, []);

  if (error) {
    return <Text>{error}</Text>
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