import React, { useEffect } from 'react';

import { useAppDispatch, useAppState } from '../../appContext';
import { getCategories } from '../../api/category/getCategories';
import { Text, ScrollView, FlatList } from 'react-native';
import { CardButton } from '../../components/CardButton';
import { CardDetails } from '../../components/CardDetails';

export const Categories = () => {
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
    <ScrollView>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <CardButton key={item.id}>
            <CardDetails
              title={item.description || 'нет описания'}
              subTitle={item.title}
              tagColor={item.color}
            />
          </CardButton>
        )}
      />
    </ScrollView>
  );
};
