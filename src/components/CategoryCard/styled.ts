import styled from 'styled-components/native';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import css from '@styled-system/css';
import { TextVariant } from '../TextVariant';
import { color, ColorProps } from 'styled-system';

export const Container = styled(TouchableOpacity)(
  css({
    display: 'flex',
    flexDirection: 'row',
    pl: 4,
  }),
);

export const Circle = styled(View)<ColorProps>(
  css({
    width: 12,
    height: 12,
    borderRadius: 6,
    mr: 2,
    mt: 4,
  }),
  color,
);

export const Content = styled(View)(
  css({
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    py: 3,
    pr: 3,
    borderColor: 'systemGray05',
    borderBottomWidth: 0.5,
  }),
);

export const Title = styled(TextVariant)(
  css({
    color: 'textPrimary',
  }),
);

export const SubTitle = styled(TextVariant)(
  css({
    color: 'systemGray01',
    mt: 1,
  }),
);

export const ContentWrapper = styled(View)(
  css({
    flex: 1,
    mr: 2,
  }),
);

export const Label = styled(TextVariant)(
  css({
    color: 'textPrimary',
  }),
);
