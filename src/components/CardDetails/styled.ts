import styled from 'styled-components/native';
import { View } from 'react-native';
import css from '@styled-system/css';
import { TextVariant } from '../TextVariant';
import { color, ColorProps } from 'styled-system';

export const Container = styled(View)(css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}));

export const SubTitleWrapper = styled(View)(css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  mb: 1,
}));

export const Circle = styled(View)<ColorProps>(css({
  width: 8,
  height: 8,
  borderRadius: 4,
  mr: 1,
}), color);

export const LeftContentWrapper = styled(View)(css({
  flex: 1,
  mr: 2,
}));

export const SubTitle = styled(TextVariant)(css({
  color: 'systemGray01',
  flex: 1,
}));

export const Title = styled(TextVariant)(css({
  color: 'textPrimary',
}));

export const Label = styled(TextVariant)(css({
  color: 'textPrimary',
}));