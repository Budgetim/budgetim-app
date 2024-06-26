import styled from 'styled-components/native';
import { variant } from 'styled-system';
import { Text } from 'react-native';
import typography from '../../theme/typography';
import css from '@styled-system/css';

export const TextVariant = styled(Text)<{ variant: keyof typeof typography }>(
  ({ theme }) =>
    variant({
      variants: theme.typography,
    }),
  css({
    color: 'textPrimary',
  }),
);
