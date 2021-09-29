import styled from 'styled-components/native';
import { View } from 'react-native';
import css from '@styled-system/css';
import { TextVariant } from '../TextVariant';

export const Container = styled(View)(css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}));

export const LeftContentWrapper = styled(View)(css({
  flex: 1,
  mr: 2,
}));

export const SubTitle = styled(TextVariant)(css({
  color: 'systemGray01',
  mb: 0,
}));

export const Title = styled(TextVariant)(css({
  color: 'textPrimary',
}));

export const Label = styled(TextVariant)(css({
  color: 'systemGray01',
}));