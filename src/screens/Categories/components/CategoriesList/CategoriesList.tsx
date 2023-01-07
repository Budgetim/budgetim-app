import i18n from 'i18n-js';
import React, { FC } from 'react';
import { ErrorMessage } from '../../../../components/ErrorMessage';
import { NoDataMessage } from '../../../../components/NoDataMessage';
import { FlatList } from 'react-native';
import { Card } from '../Card';
import { useCategoriesState } from '../../../../contexts/categories';
import { Loader } from '../../../../components/Loader';

export const CategoriesList: FC = () => {
  const { data, isLoading, error } = useCategoriesState();

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
