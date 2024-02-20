import React, { FC } from 'react';
import { View } from 'react-native';
import { separateThousands } from '../../../utils/separateThousands';
import { CategoriesListProps } from './types';
import { useNavigation } from '@react-navigation/native';
import { MixedList } from '../../../components/MixedList';
import i18n from 'i18n-js';
import { CategoryPreview } from '../../../components/CategoryPreview/CategoryPreview';
import { getCategoryTitle } from '../../../utils/getCategoryTitle';

export const CategoriesList: FC<CategoriesListProps> = ({ data, month, year, currencySymbol }) => {
  const navigation = useNavigation();

  return (
    <View>
      <MixedList
        title={i18n.t('categories.title')}
        data={data.map(item => {
          return {
            id: item.id || -1,
            title: getCategoryTitle(item.title),
            titleColor: item.title ? 'textPrimary' : 'textSecondary',
            subtitle: item.description || undefined,
            rightText: `${separateThousands(item.sum)} ${currencySymbol || ''}`,
            leftContent: <CategoryPreview color={item.color} />,
            hasArrow: true,
            onPress: () =>
              navigation.navigate('TransactionsByCategory', {
                category: item.id,
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
