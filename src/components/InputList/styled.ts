import styled from 'styled-components/native';
import { FlatList, View } from 'react-native';
import css from '@styled-system/css';
import { TextVariant } from '../TextVariant';
import { Input } from '../Input';

export const List = styled(FlatList)(css({
  bg: 'bgPrimary',
  borderRadius: 12,
})) as unknown as typeof FlatList;

export const Item = styled(View)(css({
  pl: 4,
}));

export const TextContent = styled(View)<{ borderBottom: boolean }>(({ borderBottom }) => css({
  ...(borderBottom ? {
    borderColor: 'systemGray05',
    borderBottomWidth: 0.5,
  } : {}),
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  py: 3,
  pr: 4,
}));

export const Text = styled(TextVariant)(css({
  color: 'textPrimary',
  flex: 1,
  mr: 2,
}));

export const InputField = styled(Input)(css({
  flex: 3,
}));
