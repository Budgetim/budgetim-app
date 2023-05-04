import i18n from 'i18n-js';
import React, { FC } from 'react';
import { ErrorMessage } from '../../../../components/ErrorMessage';
import { NoDataMessage } from '../../../../components/NoDataMessage';
import { FlatList } from 'react-native';
import { Card } from '../Card';
import { Loader } from '../../../../components/Loader';
import { useGetCategories } from '../../../../hooks/categories';

export const CategoriesList: FC = () => {
  const { data, isLoading, error } = useGetCategories();

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!data?.length) {
    return <NoDataMessage>{i18n.t('categories.messages.addFirst')}</NoDataMessage>;
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => `${index}-${item.id}`}
      renderItem={({ item }) => <Card {...item} />}
    />
  );
};
