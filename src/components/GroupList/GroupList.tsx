import React, { FC } from 'react';

import { ListRenderItem } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components/native';
import { ArrowRightIcon } from '../../icons/ArrowRightIcon';

import { GroupListProps, DataItem } from './types';

import { List, Item, TextContent, Text, MainIconWrapper, Variant } from './styled';

export const GroupList: FC<GroupListProps> = ({ data }) => {
  const {
    colors: { textPrimary },
  } = useTheme();

  const getIcon = (type: DataItem['type']) => {
    if (type === 'categories') {
      return (
        <MainIconWrapper bg="#2196F3">
          <FontAwesome5 name="chart-pie" color="#fff" size={18} />
        </MainIconWrapper>
      );
    }
    if (type === 'person') {
      return (
        <MainIconWrapper bg="#9E9E9E">
          <Ionicons name="person" color="#fff" size={18} />
        </MainIconWrapper>
      );
    }
    if (type === 'currency') {
      return (
        <MainIconWrapper bg="#4CAF50">
          <Ionicons name="ios-logo-usd" color="#fff" size={18} />
        </MainIconWrapper>
      );
    }
    return null;
  };

  const renderItem: ListRenderItem<DataItem> = ({ item, index }) => {
    return (
      <Item key={item.title} onPress={item.onPress}>
        {getIcon(item.type)}
        <TextContent borderBottom={index !== data.length - 1}>
          <Text variant="bodyRegular">{item.title}</Text>
          {item.variant && <Variant variant="bodyRegular">{item.variant}</Variant>}
          <ArrowRightIcon color={textPrimary} size={16} />
        </TextContent>
      </Item>
    );
  };

  return <List data={data} renderItem={renderItem} />;
};
