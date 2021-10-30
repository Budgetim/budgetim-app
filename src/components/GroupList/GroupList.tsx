import React, { FC } from 'react';

import { GroupListProps, DataItem } from './types';
import { List, Item, Text } from './styled';
import { ListRenderItem } from 'react-native';

export const GroupList: FC<GroupListProps> = ({ data }) => {
  const renderItem: ListRenderItem<DataItem> = ({ item }) => {
    return (
      <Item key={item.title} onPress={item.onPress}>
        <Text variant="bodyRegular">{item.title}</Text>
      </Item>
    )
  };

  return (
    <List data={data} renderItem={renderItem} />
  )
}