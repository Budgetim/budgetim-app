import styled from 'styled-components/native';
import { View } from 'react-native';
import css from '@styled-system/css';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextVariant } from '../TextVariant';

export const List = styled(View)(
  css({
    display: 'flex',
    flexDirection: 'row',
    borderColor: 'systemGray05',
    borderBottomWidth: 0.5,
    minWidth: '100%',
  }),
);

export const ButtonWrapper = styled(View)(
  css({
    position: 'relative',
    flexShrink: 1,
    flexGrow: 1,
  }),
);

export const Button = styled(TouchableOpacity)({});

export const Title = styled(TextVariant)<{ active: boolean }>(({ active }) =>
  css({
    py: 2,
    px: 4,
    textAlign: 'center',
    color: active ? 'textPrimary' : 'textSecondary',
  }),
);

export const Line = styled(View)(
  css({
    height: 2,
    right: 0,
    bg: 'textPrimary',
    position: 'absolute',
    bottom: -0.5,
    left: 0,
    borderRadius: 1,
  }),
);
