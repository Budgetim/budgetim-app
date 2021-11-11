import styled from 'styled-components/native';
import { ScrollView, TouchableOpacity } from 'react-native';
import css from '@styled-system/css';
import { TextVariant } from '../../components/TextVariant';

export const Container = styled(ScrollView)(css({
  px: 4,
  py: 9,
}));

export const SignOutButton = styled(TouchableOpacity)(css({
  mt: 9,
}));

export const Link = styled(TextVariant)(css({
  color: 'systemRed',
}));