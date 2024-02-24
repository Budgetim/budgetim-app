import styled from 'styled-components/native';
import { View } from 'react-native';
import css from '@styled-system/css';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const Container = styled(View)(
  css({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    bg: 'systemGray04',
    height: 48,
  }),
);

export const Item = styled(TouchableOpacity)<{ borderRight: boolean }>(({ borderRight }) =>
  css({
    borderColor: 'systemGray02',
    borderRightWidth: borderRight ? 0.5 : 0,
    p: 3,
  }),
);
