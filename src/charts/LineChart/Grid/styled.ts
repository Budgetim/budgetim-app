import styled from 'styled-components/native';
import { TextVariant } from '../../../components/TextVariant';
import css from '@styled-system/css';
import { View } from 'react-native';

export const TickMask = styled(TextVariant)(css({
  p: 1,
}));

export const TickItem = styled(View)(css({
  position: 'absolute',
  top: -0.5,
  left: 0,
  right: 0,
  borderColor: 'systemGray05',
  borderTopWidth: 0.5,
}));

export const TickText = styled(TickMask)(css({
}));

export const Container = styled(View)(css({
  marginTop: '34px',
  position: 'relative',
  borderColor: 'systemGray05',
  borderLeftWidth: 0.5,
}));