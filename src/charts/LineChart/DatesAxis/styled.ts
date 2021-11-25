import styled from 'styled-components/native';
import css from '@styled-system/css';
import { View } from 'react-native';
import { WidthProps } from 'styled-system';
import { TextVariant } from '../../../components/TextVariant';

export const Container = styled(View)(css({
  position: 'relative',
  borderColor: 'systemGray05',
  borderLeftWidth: 0.5,
  height: 18,
}));

export const CategoryWrapper = styled(View)<WidthProps>(css({
  position: 'absolute',
  left: 0,
  top: 0,
  borderColor: 'systemGray05',
  borderRightWidth: 0.5,
}));

export const CategoryLabel = styled(TextVariant)(css({
  textAlign: 'center',
}));
