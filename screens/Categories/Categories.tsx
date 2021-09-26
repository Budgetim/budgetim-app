import React, { useEffect } from 'react';

import { useAppDispatch, useAppState } from '../../appContext';
import { getCategories } from '../../api/category/getCategories';
import { Text, View, ScrollView } from 'react-native';

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
      {categories.map(category => {
        return (
          <View key={category.id}>
            <Text style={{ fontSize: 16 }}>{category.title}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};
