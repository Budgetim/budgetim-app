import styled from 'styled-components/native';
import css from '@styled-system/css';
import { View } from 'react-native';

export const Container = styled(View)(
  css({
    flex: 1,
    pt: 3,
  }),
);

export const Tabs = styled(View)(
  css({
    py: 2,
  }),
);
