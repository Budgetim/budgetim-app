import css from '@styled-system/css';
import { View } from 'react-native';
import styled from 'styled-components/native';

export const Content = styled(View)(css({
  display: 'flex',
  flexDirection: 'row',
  borderColor: 'systemGray05',
  borderTopWidth: 0.5,
}));

export const ChartWrapper = styled(View)(css({
  flex: 1,
}));
