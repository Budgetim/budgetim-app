import styled from 'styled-components/native';
import { View } from 'react-native';
import { color, ColorProps } from 'styled-system';
import css from '@styled-system/css';

export const Circle = styled(View)<ColorProps>(
  css({
    width: 24,
    height: 24,
    borderRadius: 6,
  }),
  color,
);
