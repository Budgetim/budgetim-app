import styled from 'styled-components/native'
import { TouchableOpacity, View } from 'react-native';
import css from '@styled-system/css';
import { TextVariant } from '../../../TextVariant';

export const Wrapper = styled(View)(css({
  m: -4,
}));

export const ShowMoreWrapper = styled(TouchableOpacity)(css({
  p: 4,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}));

export const ShowMoreText = styled(TextVariant)(css({
  color: 'textPrimary',
  ml: 1,
}));