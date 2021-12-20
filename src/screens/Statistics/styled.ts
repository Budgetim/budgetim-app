import styled from 'styled-components/native';
import css from '@styled-system/css';
import { ScrollView } from 'react-native';

export const Container = styled(ScrollView)(
  css({
    px: 4,
    py: 8,
  }),
);
