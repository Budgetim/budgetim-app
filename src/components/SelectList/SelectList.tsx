import React, { FC } from 'react';

import { ListRenderItem } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'styled-components/native';

import { DataItem, SelectListProps } from './types';
import { List, Item, TextContent, Text, Circle } from './styled';

export const SelectList: FC<SelectListProps> = ({ data, onSelect, backgroundColor }) => {
  const { colors: { systemBlue, systemGray06 } } = useTheme();

  const renderItem: ListRenderItem<DataItem> = ({ item, index }) => {
    return (
      <Item key={item.id} onPress={() => onSelect(item.id)}>
        {item.color && <Circle bg={item.color} />}
        <TextContent borderBottom={index !== data.length - 1}>
          <Text variant="bodyRegular">{item.title}</Text>
          <Feather name="check" color={item.isActive ? systemBlue : (backgroundColor || systemGray06)} size={28} />
        </TextContent>
      </Item>
    )
  };

  return (
    <List data={data} renderItem={renderItem} bg={backgroundColor || systemGray06} />
  )
}