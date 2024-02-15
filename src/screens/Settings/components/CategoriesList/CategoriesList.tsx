import i18n from 'i18n-js';
import React, { FC, useEffect } from 'react';
import { ErrorMessage } from '../../../../components/ErrorMessage';
import { NoDataMessage } from '../../../../components/NoDataMessage';
import { Alert } from 'react-native';
import { Loader } from '../../../../components/Loader';
import { useDeleteCategory, useGetCategories } from '../../../../hooks/categories';
import { MixedList } from '../../../../components/MixedList';
import { useTheme } from 'styled-components/native';
import { useModalsDispatch } from '../../../../contexts/modals';
import { PlusIcon } from '../../../../icons/PlusIcon';
import { CategoryPreview } from '../../../../components/CategoryPreview';

export const CategoriesList: FC = () => {
  const {
    colors: { systemBlue },
  } = useTheme();
  const { data, isLoading, error } = useGetCategories();
  const dispatch = useModalsDispatch();
  const { mutate: deleteCategory, isError, error: deleteError } = useDeleteCategory();

  useEffect(() => {
    if (isError) {
      Alert.alert(i18n.t('common.state.error'), deleteError);
    }
  }, [isError]);

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
    <MixedList
      title={i18n.t('categories.title')}
      data={[
        {
          id: 'add',
          title: i18n.t('categories.action.add'),
          titleColor: 'systemBlue',
          leftContent: <PlusIcon color={systemBlue} size={24} />,
          onPress: () => dispatch({ type: 'setCategoryModal', payload: undefined }),
        },
      ].concat(
        data.map(item => {
          return {
            id: item.id,
            title: item.title || i18n.t('transactions.emptyTitle'),
            titleColor: item.title ? 'textPrimary' : 'textSecondary',
            subtitle: item.description,
            leftContent: <CategoryPreview color={item.color} />,
            onPress: () => dispatch({ type: 'setCategoryModal', payload: { id: item.id } }),
            onDelete: () => deleteCategory(item.id),
          };
        }),
      )}
    />
  );
};
