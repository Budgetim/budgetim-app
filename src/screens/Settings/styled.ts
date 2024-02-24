import styled from 'styled-components/native';
import { ScrollView, View } from 'react-native';
import css from '@styled-system/css';

export const Container = styled(ScrollView)(
  css({
    px: 3,
  }),
);

export const Item = styled(View)(
  css({
    mb: 6,
  }),
);
