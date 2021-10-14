import Svg from 'react-native-svg';
import styled from 'styled-components/native';
import { View } from 'react-native';
import css from '@styled-system/css';
import { WidthProps, HeightProps } from 'styled-system';

export const Container = styled(View)(css({
  position: 'relative',
}));

export const SvgCircle = styled(Svg)(css({
  overflow: 'visible',
}));

export const LabelWrapper = styled(View)<WidthProps & HeightProps>(css({
  position: 'absolute',
  left: 0,
  top: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
