import styled from 'styled-components/native'
import { ColorProps, color } from 'styled-system';
import { Text, TouchableOpacity, View } from 'react-native';
import css, { SystemStyleObject } from '@styled-system/css';
import { TextVariant } from '../../../../components/TextVariant';

export const Header = styled(View)(css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  p: 4,
}))

export const Content = styled(View)(css({
  p: 4,
}));

export const SectionGroup = styled(View)(css({
  display: 'flex',
  flexDirection: 'row',
}))

export const Section = styled(View)(css({
  borderRadius: 12,
  bg: 'bgPrimary',
  p: 4,
  mb: 4,
}));

export const ModalWrapper = styled(View)({
  flex: 1,
  justifyContent: 'flex-end',
  display: 'flex',
});

export const ModalContent = styled(View)(css({
  bg: 'systemGray06',
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  shadowOpacity: 0.1,
  shadowRadius: 3,
  maxHeight: '80%',
} as SystemStyleObject));

export const ButtonText = styled(TextVariant)(css({
  color: 'systemBlue',
}))

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