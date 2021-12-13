import { View } from 'react-native';
import Canvas from 'react-native-canvas';
import styled from 'styled-components/native';

export const Wrapper = styled(View)({
  position: 'relative',
});

export const StaticCanvas = styled(Canvas)({
  position: 'absolute',
  top: 0,
  left: 0,
});
