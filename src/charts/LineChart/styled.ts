import styled from 'styled-components/native';
import { View } from 'react-native';
import css from '@styled-system/css';
import { WidthProps } from 'styled-system';
import { TextVariant } from '../../components/TextVariant';

export const ChartContainer = styled(View)(css({
  position: 'relative',
}));

export const Header = styled(View)(css({
  height: 34,
  position: 'relative'
}));

export const HeaderTitle = styled(TextVariant)(css({
  textAlign: 'center'
}));

export const PriceLabel = styled(View)(css({
  position: 'absolute',
  bottom: 0,
}));

export const CategoryWrapper = styled(View)<WidthProps>(css({
  position: 'absolute',
  left: 0,
  bottom: 0,
}));

export const CategoryLabel = styled(TextVariant)(css({
  textAlign: 'center',
}));
