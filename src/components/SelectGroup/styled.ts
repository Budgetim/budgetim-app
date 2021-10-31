import styled from 'styled-components/native';
import { ScrollView, TouchableOpacity } from 'react-native';
import css from '@styled-system/css';
import { TextVariant } from '../TextVariant';

export const List = styled(ScrollView)(css({
  display: 'flex',
  flexDirection: 'row',
  flexGrow: 0,
  pt: 4,
  px: 4,
}));

export const Button = styled(TouchableOpacity)<{ active: boolean }>(({ active }) => css({
  bg: active ? 'systemGray05' : 'bgPrimary',
  borderRadius: 8,
  py: 1,
  px: 2,
  mr: 2,
}));

export const Title = styled(TextVariant)(css({
}));