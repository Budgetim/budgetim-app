import styled from 'styled-components/native';
import { TextInput } from 'react-native';
import css from '@styled-system/css';
import typography from '../../theme/typography';
import { variant } from 'styled-system';

export const Input = styled(TextInput)<{ variant: keyof typeof typography }>(
  ({ theme }) =>
    variant({
      variants: theme.typography,
    }),
  css({
    color: 'textPrimary',
    bg: 'systemGray06',
    p: 3,
    borderRadius: 12,
  }),
);
