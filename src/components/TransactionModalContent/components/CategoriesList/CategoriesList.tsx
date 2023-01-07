import React, { FC, useEffect, useState } from 'react';
import { useTheme } from 'styled-components/native';
import i18n from 'i18n-js';

import { useCategoriesState } from '../../../../contexts/categories';

import { usePrevious } from '../../../../hooks/usePrevious';
import { ArrowDownIcon } from '../../../../icons/ArrowDownIcon';
import { PlusCircleIcon } from '../../../../icons/PlusCircleIcon';
import { AddCategoryModal } from '../../../../screens/Categories/components/AddCategoryModal';
import { ErrorMessage } from '../../../ErrorMessage';
import { Loader } from '../../../Loader';
import { SelectList } from '../../../SelectList';
import { Wrapper, ShowMoreWrapper, ShowMoreText, AddButton, AddText } from './styled';
import { CategoriesListProps } from './types';

export const CategoriesList: FC<CategoriesListProps> = ({ activeCategoryId, setCategoryId }) => {
  const { data, error, isLoading } = useCategoriesState();
  const prevData = usePrevious(data);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const {
    colors: { systemGray05, textPrimary, bgPrimary, systemBlue },
  } = useTheme();

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

  return (
    <Wrapper>
      <SelectList
        backgroundColor={bgPrimary}
        onSelect={id => {
          setCategoryId(id);
        }}
        data={data.slice(0, showAll ? data.length : 6).map(item => {
          return {
            id: item.id,
            title: item.title,
            color: item.color || systemGray05,
            isActive: item.id === activeCategoryId,
          };
        })}
      />
      {!showAll && data.length > 6 ? (
        <ShowMoreWrapper onPress={() => setShowAll(true)}>
          <ArrowDownIcon color={textPrimary} size={10} />
          <ShowMoreText variant="subheadlineRegular">{i18n.t('categories.action.more')}</ShowMoreText>
        </ShowMoreWrapper>
      ) : (
        <AddButton onPress={() => setCategoryModalVisible(true)}>
          <PlusCircleIcon color={systemBlue} size={24} />
          <AddText variant="subheadlineRegular">{i18n.t('categories.action.add')}</AddText>
        </AddButton>
      )}
      <AddCategoryModal visible={categoryModalVisible} setVisible={setCategoryModalVisible} />
    </Wrapper>
  );
};
