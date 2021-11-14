import React, { FC } from 'react';
import { ListRenderItem } from 'react-native';

import { InputListProps, DataItem } from './types';
import { List, Item, TextContent, Text, InputField } from './styled';

export const InputList: FC<InputListProps> = ({ data }) => {
  const renderItem: ListRenderItem<DataItem> = ({ item, index }) => {
    return (
      <Item key={item.title}>
        <TextContent borderBottom={index !== data.length - 1}>
          <Text variant="bodyRegular">{item.title}</Text>
          <InputField
            variant="bodyRegular"
            placeholder={item.placeholder}
            value={item.value}
            onChangeText={item.setValue}
            secureTextEntry
            autoFocus
          />
        </TextContent>
      </Item>
    );
  };

  return (
    <List data={data} renderItem={renderItem} />
  );
}