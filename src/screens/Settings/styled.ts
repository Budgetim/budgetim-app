import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import css from '@styled-system/css';

export const Container = styled(ScrollView)(css({
  px: 5,
  py: 5,
}));