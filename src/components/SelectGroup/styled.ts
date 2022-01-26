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
    backgroundColor: 'systemGray06',
    alignItems: 'center',
  }),
);

export const Separator = styled(View)<{ visible: boolean }>(({ visible }) =>
  css({
    height: 16,
    backgroundColor: visible ? 'systemGray04' : 'systemGray06',
    width: 1,
  }),
);

export const Item = styled(View)(
  css({
    flexShrink: 1,
    flexGrow: 1,
  }),
);

export const Button = styled(TouchableOpacity)<{ active: boolean }>(({ active }) =>
  css({
    bg: active ? 'systemGray03' : 'systemGray06',
    borderRadius: 8,
    p: 1,
  }),
);

export const Title = styled(TextVariant)(css({ textAlign: 'center' }));
