import React, { FC, useEffect } from 'react';
import { ErrorMessage } from '../../../../components/ErrorMessage';
import { useUserState } from '../../../../contexts/user';
import { FlatList } from 'react-native';
import { getCategories } from '../../../../api/categories/getCategories';
import { Card } from '../Card';
import { TextVariant } from '../../../../components/TextVariant';
import { useCategoriesState, useCategoriesDispatch } from '../../../../contexts/categories';
import { Loader } from '../../../../components/Loader';
import { useErrorHandler } from '../../../../hooks/useErrorHandler';

export const CategoriesList: FC = () => {
  const { data, isLoading, error } = useCategoriesState();
  const dispatch = useCategoriesDispatch();
  const { token } = useUserState();

  useErrorHandler(error);

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
    return <ErrorMessage>{error}</ErrorMessage>
  }

  if (isLoading) {
    return <Loader />;
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