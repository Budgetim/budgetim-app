import React, { FC } from 'react';

import { ListRenderItem } from 'react-native';
import { useTheme } from 'styled-components/native';

import { DataItem, MixedListProps } from './types';
import { List, MainTitle } from './styled';
import { MixedListItem } from './components/MixedListItem';

export const MixedList: FC<MixedListProps> = ({ data, backgroundColor, title }) => {
  const {
    colors: { systemGray06 },
  } = useTheme();

  const renderItem: ListRenderItem<DataItem> = ({ item, index }) => {
    return <MixedListItem {...item} isLast={index === data.length - 1} />;
  };

  return (
    <>
      {!!title && <MainTitle variant="subheadlineRegular">{title}</MainTitle>}
      <List
        data={data}
        keyExtractor={(item, index) => `${index}-${item.id}`}
        renderItem={renderItem}
        bg={backgroundColor || systemGray06}
      />
    </>
  );
};
