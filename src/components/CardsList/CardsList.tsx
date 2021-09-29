import React, { FC } from 'react';
import { FlatList, View } from 'react-native';
import { CardsListProps } from './types';

export const CardsList = <T extends object>(props: CardsListProps<T>) => {
  const { data, renderItem } = props;
  return (
    <FlatList
      data={data}
      renderItem={() => (
        <View>{renderItem}</View>
      )}
    />
  );
}