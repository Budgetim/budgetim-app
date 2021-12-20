import React, { FC } from 'react';
import { View } from 'react-native';

import { separateThousands } from '../../../utils/separateThousands';
import { CategoryCard } from '../../../components/CategoryCard';

import { CategoriesListProps } from './types';
import { useNavigation } from '@react-navigation/native';
import { useUserState } from '../../../contexts/user';

export const CategoriesList: FC<CategoriesListProps> = ({ data, month, year }) => {
  const { currency } = useUserState();
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
            label={`${separateThousands(+item.sum)} ${currency?.unit || ''}`}
            tagColor={item.color}
          />
        );
      })}
    </View>
  );
};
