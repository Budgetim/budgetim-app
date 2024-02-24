import styled from 'styled-components/native';
import { View } from 'react-native';
import css from '@styled-system/css';

export const Content = styled(View)(
  css({
    px: 3,
    py: 4,
  }),
);

export const Section = styled(View)<{ error?: boolean }>(({ error }) =>
  css({
    mb: 5,
    borderRadius: 12,
    ...(error
      ? {
          borderColor: 'systemRed',
          borderWidth: 0.5,
        }
      : {}),
  }),
);
