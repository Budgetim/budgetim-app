import styled from 'styled-components/native';
import { View } from 'react-native';
import css from '@styled-system/css';

export const Container = styled(View)(css({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
}));