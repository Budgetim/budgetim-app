import css from '@styled-system/css';
import { View } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(View)(
  css({
    bg: 'tag01',
    borderRadius: 8,
    m: 4,
    p: 4,
  }),
);
