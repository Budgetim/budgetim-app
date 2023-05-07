import styled from 'styled-components/native';
import { View } from 'react-native';
import css from '@styled-system/css';

export const Content = styled(View)(
  css({
    p: 4,
  }),
);

export const Section = styled(View)<{ error?: boolean }>(({ error }) =>
  css({
    borderRadius: 12,
    bg: 'bgPrimary',
    p: 4,
    mb: 4,
    ...(error
      ? {
          borderColor: 'systemRed',
          borderWidth: 0.5,
        }
      : {}),
  }),
);
