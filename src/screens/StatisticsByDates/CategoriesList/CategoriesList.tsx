import React, { FC } from 'react';
import { View } from 'react-native';
import { separateThousands } from '../../../utils/separateThousands';
import { CategoriesListProps } from './types';
import { useNavigation } from '@react-navigation/native';
import { MixedList } from '../../../components/MixedList';
import { CategoryPreview } from '../../../components/CategoryPreview/CategoryPreview';
import { getCategoryTitle } from '../../../utils/getCategoryTitle';

export const CategoriesList: FC<CategoriesListProps> = ({ data, month, year, currencySymbol }) => {
  const navigation = useNavigation();

  return (
    <View style={{ marginHorizontal: 12 }}>
      <MixedList
        data={data.map(item => {
          return {
            id: item.categoryId || -1,
            title: getCategoryTitle(item.title),
            titleColor: item.title ? 'textPrimary' : 'textSecondary',
            subtitle: item.description || undefined,
            rightText: `${separateThousands(item.sum)} ${currencySymbol || ''}`,
            leftContent: <CategoryPreview color={item.color} />,
            hasArrow: true,
            onPress: () =>
              navigation.navigate('TransactionsByCategory', {
                category: item.categoryId,
                categoryTitle: item.title,
                month,
                year,
              }),
          };
        })}
      />
    </View>
  );
};
