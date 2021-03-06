import i18n from 'i18n-js';
import React, { FC, useEffect } from 'react';
import { ErrorMessage } from '../../../../components/ErrorMessage';
import { NoDataMessage } from '../../../../components/NoDataMessage';
import { useUserState } from '../../../../contexts/user';
import { FlatList } from 'react-native';
import { getCategories } from '../../../../api/categories/getCategories';
import { Card } from '../Card';
import { useCategoriesState, useCategoriesDispatch } from '../../../../contexts/categories';
import { Loader } from '../../../../components/Loader';
import { useErrorHandler } from '../../../../hooks/useErrorHandler';

export const CategoriesList: FC = () => {
  const { data, dataLoaded, isLoading, error } = useCategoriesState();
  const dispatch = useCategoriesDispatch();
  const { token } = useUserState();

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
      void getData();
    }
  }, []);

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!data?.length) {
    return <NoDataMessage>{i18n.t('categories.messages.addFirst')}</NoDataMessage>;
  }

  return <FlatList data={data} renderItem={({ item }) => <Card key={item.id} {...item} />} />;
};
