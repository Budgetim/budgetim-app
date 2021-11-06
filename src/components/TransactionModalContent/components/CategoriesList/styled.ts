import styled from 'styled-components/native'
import { ColorProps, color } from 'styled-system';
import { TouchableOpacity, View } from 'react-native';
import css from '@styled-system/css';
import { TextVariant } from '../../../TextVariant';

export const CategoryWrapper = styled(TouchableOpacity)<{ hasBorder: boolean }>(props => css({
  py: 4,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  ...(props.hasBorder ? {
    borderColor: 'systemGray05',
    borderBottomWidth: 0.5,
  } : {})
}));

export const Categories = styled(View)(css({
  my: -4,
}));

export const Circle = styled(View)<ColorProps>(css({
  width: 8,
  height: 8,
  borderRadius: 4,
  mr: 2,
}), color);

export const Category = styled(TextVariant)<{ isSelected: boolean }>(props => css({
  color: props.isSelected ? 'systemBlue' : 'textPrimary',
}), color);

export const ShowMoreWrapper = styled(TouchableOpacity)(css({
  py: 4,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}));

export const ShowMoreText = styled(TextVariant)(css({
  color: 'textPrimary',
  ml: 1,
}));