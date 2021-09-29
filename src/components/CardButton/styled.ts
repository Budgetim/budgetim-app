import styled from 'styled-components/native';
import { TouchableOpacity, View } from 'react-native';
import css from '@styled-system/css';

export const Container = styled(TouchableOpacity)(css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  p: 4,
  borderColor: 'systemGray05',
  borderBottomWidth: 0.5,
}));

export const Content = styled(View)(css({
  flex: 1,
  mr: 1,
}));
