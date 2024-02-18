import React, { FC, useEffect, useState } from 'react';
import { useTheme } from 'styled-components/native';
import i18n from 'i18n-js';
import { usePrevious } from '../../../../../../hooks/usePrevious';
import { ArrowDownIcon } from '../../../../../../icons/ArrowDownIcon';
import { ErrorMessage } from '../../../../../../components/ErrorMessage';
import { Loader } from '../../../../../../components/Loader';
import { CategoriesListProps } from './types';
import { useGetCategories } from '../../../../../../hooks/categories';
import { useModalsDispatch } from '../../../../../../contexts/modals';
import { MixedList } from '../../../../../../components/MixedList';
import { CategoryPreview } from '../../../../../../components/CategoryPreview';
import { CheckIcon } from '../../../../../../icons/CheckIcon';
import { PlusIcon } from '../../../../../../icons/PlusIcon';

const MAX_COUNT = 6;

export const CategoriesList: FC<CategoriesListProps> = ({ activeCategoryId, setCategoryId }) => {
  const { data, error, isLoading } = useGetCategories();
  const prevData = usePrevious(data);
  const [showAll, setShowAll] = useState(false);
  const {
    colors: { systemGray05, systemGray06, systemBlue },
  } = useTheme();
  const modalDispatch = useModalsDispatch();

  useEffect(() => {
    if (!data) return;
    // установление только что добавленной категории
    const currentDataLength = data.length;
    const prevDataLength = prevData?.length || 0;
    if (currentDataLength > 0 && currentDataLength === prevDataLength + 1) {
      setCategoryId(data[currentDataLength - 1].id);
    }
  }, [data]);

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return null;
  }

  return (
    <MixedList
      title={i18n.t('categories.title')}
      data={[
        {
          id: -1,
          title: i18n.t('categories.action.add'),
          titleColor: 'systemBlue',
          leftContent: <PlusIcon color={systemBlue} size={24} />,
          onPress: () => modalDispatch({ type: 'setCategoryModal', payload: undefined }),
        },
        ...data.slice(0, showAll ? data.length : MAX_COUNT).map(item => {
          return {
            id: item.id,
            title: item.title || i18n.t('transactions.emptyTitle'),
            leftContent: <CategoryPreview color={item.color || systemGray05} />,
            rightContent: <CheckIcon color={item.id === activeCategoryId ? systemBlue : systemGray06} size={28} />,
            onPress: () => setCategoryId(item.id),
          };
        }),
        ...(!showAll && data.length > MAX_COUNT
          ? [
              {
                id: -2,
                title: i18n.t('categories.action.more'),
                titleColor: 'systemBlue',
                leftContent: <ArrowDownIcon color={systemBlue} size={16} style={{ marginLeft: 3 }} />,
                onPress: () => setShowAll(true),
              },
            ]
          : []),
      ]}
    />
  );
};
