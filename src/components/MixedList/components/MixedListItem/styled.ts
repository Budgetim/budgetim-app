import styled from 'styled-components/native';
import { View } from 'react-native';
import { color, ColorProps } from 'styled-system';
import css from '@styled-system/css';
import { TextVariant } from '../../../TextVariant';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const InnerItem = styled(TouchableOpacity)(
  css({
    flexDirection: 'row',
    pl: 3,
    minHeight: 44,
  }),
);

export const LeftContent = styled(View)(() =>
  css({
    display: 'flex',
    width: 36,
    py: 3,
  }),
);

export const MainContent = styled(View)(
  css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    py: 2,
    pr: 4,
  }),
);

export const Line = styled(View)<{ hasLeftContent: boolean }>(({ hasLeftContent }) =>
  css({
    height: 0.5,
    ml: hasLeftContent ? 12 : 3,
    bg: 'systemGray05',
  }),
);

export const Text = styled(TextVariant)(
  css({
    color: 'textPrimary',
  }),
);

export const Title = styled(TextVariant)<ColorProps>(color);

export const SubTitle = styled(TextVariant)(
  css({
    color: 'textSecondary',
    mt: 1,
  }),
);

export const ContentWrapper = styled(View)(
  css({
    flex: 1,
    mr: 2,
  }),
);

export const RightText = styled(TextVariant)(
  css({
    color: 'systemGray01',
  }),
);
