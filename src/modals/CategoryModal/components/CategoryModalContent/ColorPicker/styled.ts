import styled from 'styled-components/native';
import css from '@styled-system/css';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color, ColorProps } from 'styled-system';

const SIZE = 52;
const LINE_WIDTH = 3;
const DIAMETER = SIZE - LINE_WIDTH * 4;

export const Container = styled(View)(
  css({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    p: 2,
    bg: 'systemGray06',
    borderRadius: 12,
  }),
);

export const CircleButton = styled(TouchableOpacity)<{ active: boolean }>(({ active }) =>
  css({
    borderRadius: SIZE / 2,
    borderColor: active ? 'systemGray02' : 'systemGray06',
    borderWidth: LINE_WIDTH,
    width: SIZE,
    height: SIZE,
    padding: `${LINE_WIDTH}px`,
    margin: '2px',
  }),
);

export const Circle = styled(View)<ColorProps>(
  css({
    display: 'flex',
    width: DIAMETER,
    height: DIAMETER,
    borderRadius: DIAMETER / 2,
  }),
  color,
);
