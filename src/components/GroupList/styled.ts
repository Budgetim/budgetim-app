import styled from 'styled-components/native';
import { FlatList, TouchableOpacity } from 'react-native';
import css from '@styled-system/css';
import { TextVariant } from '../TextVariant';

export const List = styled(FlatList)(css({
  bg: 'systemGray06',
  borderRadius: 12,
}));

export const Item = styled(TouchableOpacity)(css({
  py: 3,
  px: 4,
  borderColor: 'systemGray05',
  borderBottomWidth: 0.5,
}));

export const Text = styled(TextVariant)(css({
  color: 'textPrimary',
}));