import React, { FC } from 'react';
import { View } from 'react-native';
import { separateThousands } from '../../../utils/separateThousands';
import { CategoriesListProps } from './types';
import { useNavigation } from '@react-navigation/native';
import { MixedList } from '../../../components/MixedList';
import i18n from 'i18n-js';
import { CategoryPreview } from '../../../components/CategoryPreview/CategoryPreview';

export const CategoriesList: FC<CategoriesListProps> = ({ data, month, year, currencySymbol }) => {
  const navigation = useNavigation();

  return (
    <View>
      <MixedList
        title={i18n.t('categories.title')}
        data={data.map(item => {
          return {
            id: item.id,
            title: item.title || i18n.t('transactions.emptyTitle'),
            titleColor: item.title ? 'textPrimary' : 'textSecondary',
            subtitle: item.description,
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
