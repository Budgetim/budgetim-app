import React, { FC } from 'react';

import { ListRenderItem } from 'react-native';
import { useTheme } from 'styled-components/native';
import { ArrowRightIcon } from '../../icons/ArrowRightIcon';
import { ChartPieIcon } from '../../icons/ChartPieIcon';
import { LineChartIcon } from '../../icons/LineChartIcon';
import { PersonIcon } from '../../icons/PersonIcon';
import { UsdIcon } from '../../icons/UsdIcon';

import { GroupListProps, DataItem } from './types';

import { List, Item, TextContent, Text, MainIconWrapper, Variant } from './styled';

export const GroupList: FC<GroupListProps> = ({ data }) => {
  const {
    colors: { textSecondary },
  } = useTheme();

  const getIcon = (type: DataItem['type']) => {
    if (type === 'categories') {
      return (
        <MainIconWrapper bg="#2196F3">
          <ChartPieIcon color="#fff" size={19} />
        </MainIconWrapper>
      );
    }
    if (type === 'periods') {
      return (
        <MainIconWrapper bg="#4CAF50">
          <LineChartIcon color="#fff" size={19} />
        </MainIconWrapper>
      );
    }
    if (type === 'person') {
      return (
        <MainIconWrapper bg="#9E9E9E">
          <PersonIcon color="#fff" size={18} />
        </MainIconWrapper>
      );
    }
    if (type === 'currency') {
      return (
        <MainIconWrapper bg="#4CAF50">
          <UsdIcon color="#fff" size={19} />
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
          <ArrowRightIcon color={textSecondary} size={14} />
        </TextContent>
      </Item>
    );
  };

  return <List data={data} renderItem={renderItem} />;
};
