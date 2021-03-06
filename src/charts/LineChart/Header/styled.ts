import styled from 'styled-components/native';
import { View } from 'react-native';
import css from '@styled-system/css';
import { TextVariant } from '../../../components/TextVariant';

export const Container = styled(View)(
  css({
    height: 40,
    position: 'relative',
  }),
);

export const HeaderTitle = styled(TextVariant)(
  css({
    textAlign: 'center',
  }),
);

export const PriceLabel = styled(View)(
  css({
    position: 'absolute',
    bottom: 1,
  }),
);

export const PriceText = styled(TextVariant)(
  css({
    color: 'chart01',
  }),
);

export const Selectors = styled(View)(
  css({
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    pb: 1,
  }),
);
