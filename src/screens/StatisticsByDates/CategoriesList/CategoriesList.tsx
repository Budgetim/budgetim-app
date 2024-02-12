import React, { FC } from 'react';
import { View } from 'react-native';

import { separateThousands } from '../../../utils/separateThousands';
import { CategoryCard } from '../../../components/CategoryCard';

import { CategoriesListProps } from './types';
import { useNavigation } from '@react-navigation/native';

export const CategoriesList: FC<CategoriesListProps> = ({ data, month, year, currencySymbol }) => {
  const navigation = useNavigation();

  return (
    <View>
      {data.map(item => {
        return (
          <CategoryCard
            key={item.id}
            onPress={() =>
              navigation.navigate('TransactionsByCategory', {
                category: item.id,
                categoryTitle: item.title,
                month,
                year,
              })
            }
            title={item.title}
            description={item.description}
            label={`${separateThousands(item.sum)} ${currencySymbol || ''}`}
            tagColor={item.color}
          />
        );
      })}
    </View>
  );
};
