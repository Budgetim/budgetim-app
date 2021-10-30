import React, { FC, useEffect } from 'react';
import { useUser } from '../../../../contexts/app';
import { FlatList } from 'react-native';
import { getCategories } from '../../../../api/category/getCategories';
import { Card } from '../Card';
import { TextVariant } from '../../../../components/TextVariant';
import { useCategoriesState, useCategoriesDispatch } from '../../../../contexts/categories';

export const CategoriesList: FC = () => {
  const { data, isLoading, error } = useCategoriesState();
  const dispatch = useCategoriesDispatch();
  const { token } = useUser();

  const getData = async () => {
    try {
      const categories = await getCategories(token);
      dispatch({ type: 'setData', payload: { data: categories } })
    } catch (error) {
      dispatch({ type: 'setError', payload: { error }})
    }
  };

  useEffect(() => {
    void getData();
  }, []);

  if (error) {
    return <TextVariant variant="bodyRegular">{error}</TextVariant>
  }

  if (isLoading) {
    return <TextVariant variant="bodyRegular">Loading...</TextVariant>
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <Card key={item.id} {...item} />
      )}
    />
  );
};