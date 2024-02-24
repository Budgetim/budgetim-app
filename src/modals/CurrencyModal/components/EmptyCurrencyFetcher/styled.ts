import styled from 'styled-components/native';
import { View } from 'react-native';
import css from '@styled-system/css';

export const Content = styled(View)(
  css({
    py: 4,
    px: 3,
  }),
);

export const Section = styled(View)<{ error?: boolean }>(({ error }) =>
  css({
    borderRadius: 12,
    mb: 5,
    ...(error
      ? {
          borderColor: 'systemRed',
          borderWidth: 0.5,
        }
      : {}),
  }),
);
