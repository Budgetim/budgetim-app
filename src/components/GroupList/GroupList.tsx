import React, { FC } from 'react';

import { GroupListProps } from './types';
import { List, Item, Text } from './styled';

export const GroupList: FC<GroupListProps> = ({ data }) => {
  return (
    <List
      data={data}
      renderItem={({ item }) => {
        return (
          <Item key={item.title} onPress={item.onPress}>
            <Text variant="bodyRegular">{item.title}</Text>
          </Item>
        )
      }}
    />
  )
}