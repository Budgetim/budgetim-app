import styled from 'styled-components/native';
import { FlatList, TouchableOpacity, View } from 'react-native';
import css from '@styled-system/css';
import { TextVariant } from '../TextVariant';
import { color, ColorProps } from 'styled-system';

export const List = styled(FlatList)<ColorProps>(css({
  bg: 'systemGray06',
  borderRadius: 12,
}), color) as unknown as typeof FlatList;

export const Item = styled(TouchableOpacity)(css({
  pl: 4,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}));

export const Circle = styled(View)<ColorProps>(css({
  width: 10,
  height: 10,
  borderRadius: 5,
  mr: 3,
}), color);

export const TextContent = styled(View)<{ borderBottom: boolean }>(({ borderBottom }) => css({
  ...(borderBottom ? {
    borderColor: 'systemGray05',
    borderBottomWidth: 0.5,
  } : {}),
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
  py: 2,
  pr: 4,
}));

export const TextWrap = styled(View)(css({
  flex: 1,
  mr: 2,
  display: 'flex',
  flexDirection: 'row',
}));


export const Text = styled(TextVariant)(css({
  color: 'textPrimary',
}));

export const Unit = styled(TextVariant)(css({
  mr: 2,
  color: 'textPrimary',
}));
