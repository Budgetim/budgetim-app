import styled from 'styled-components/native';
import css from '@styled-system/css';
import { TouchableOpacity, View } from 'react-native';
import { color, ColorProps } from 'styled-system';

const SIZE = 52;
const LINE_WIDTH = 3;
const DIAMETER = SIZE - LINE_WIDTH * 4;

export const Container = styled(View)(css({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  margin: '-6px',
}));

export const CircleButton = styled(TouchableOpacity)<{ active: boolean }>(({ active }) => css({
  borderRadius: SIZE / 2,
  borderColor: active ? 'systemGray03' : 'bgPrimary',
  borderWidth: LINE_WIDTH,
  width: SIZE,
  height: SIZE,
  padding: `${LINE_WIDTH}px`,
  margin: '2px',
}));

export const Circle = styled(View)<ColorProps>(css({
  display: 'flex',
  width: DIAMETER,
  height: DIAMETER,
  borderRadius: DIAMETER / 2,
}), color);
