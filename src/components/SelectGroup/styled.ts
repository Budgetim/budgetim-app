import styled from 'styled-components/native';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import css from '@styled-system/css';
import { TextVariant } from '../TextVariant';

export const List = styled(View)(
  css({
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    p: '2px',
    backgroundColor: 'systemGray06',
  }),
);

export const Button = styled(TouchableOpacity)<{ active: boolean }>(({ active }) =>
  css({
    bg: active ? 'systemGray03' : 'systemGray06',
    borderRadius: 8,
    py: 1,
    px: 4,
  }),
);

export const Title = styled(TextVariant)(css({}));
