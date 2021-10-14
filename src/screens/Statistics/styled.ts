import styled from 'styled-components/native';
import css from '@styled-system/css';

import { TextVariant } from '../../components/TextVariant';
import { TouchableOpacity, View } from 'react-native';

export const Wrapper = styled(View)(css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
}));

export const PieChartWrapper = styled(View)(css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  padding: 5,
}));

export const ItemButton = styled(TouchableOpacity)<{ active: boolean }>(({ active }) => css({
  color: 'textPrimary',
  py: 2,
  px: 3,
  m: 3,
  bg: active ? 'systemGray05' : 'bgPrimary',
  borderRadius: 8,
}));

export const Item = styled(TextVariant)(css({
  color: 'textPrimary',
}));

export const ChartSubtitle = styled(TextVariant)(css({
  color: 'textPrimary',
  mb: 1,
}));

export const ChartTitle = styled(TextVariant)(css({
  color: 'textPrimary',
}));