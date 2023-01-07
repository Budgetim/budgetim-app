import styled from 'styled-components/native';
import { View } from 'react-native';
import css from '@styled-system/css';
import { TextVariant } from '../TextVariant';

export const TitleWrapper = styled(View)(
  css({
    borderColor: 'systemGray05',
    borderBottomWidth: 0.5,
    ml: 4,
  }),
);

export const Title = styled(TextVariant)(
  css({
    color: 'textPrimary',
    bg: 'bgPrimary',
    pt: 7,
    pb: 2,
    borderColor: 'systemGray05',
    borderBottomWidth: 0.5,
  }),
);
