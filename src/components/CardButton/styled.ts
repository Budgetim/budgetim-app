import styled from 'styled-components/native';
import { TouchableOpacity, View } from 'react-native';
import css from '@styled-system/css';

export const Container = styled(TouchableOpacity)(css({
  pl: 4,
}));

export const Content = styled(View)(css({
  borderColor: 'systemGray05',
  py: 4,
  pr: 4,
  borderBottomWidth: 0.5,
}));
