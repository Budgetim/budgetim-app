import styled from 'styled-components/native';
import { TextVariant } from '../../components/TextVariant';
import css from '@styled-system/css';
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native';

export const Page = styled(ScrollView)(css({
  px: 4,
  py: 64,
}));

export const MainTitle = styled(TextVariant)(css({
  color: 'textPrimary',
  mb: 4,
  textAlign: 'center',
}));

export const Description = styled(TextVariant)(css({
  color: 'textSecondary',
  textAlign: 'center',
}));

export const ErrorMessage = styled(TextVariant)(css({
  color: 'systemRed',
  mt: 3,
  textAlign: 'center',
}));

export const Form = styled(View)(css({
  mt: 10,
  mb: 8,
  flexGrow: 1,
}));

export const LargeButton = styled(TouchableOpacity)(css({
  color: 'textPrimary',
  bg: 'systemBlue',
  width: '100%',
  p: 4,
  borderRadius: 12,
  mb: 8,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const Loader = styled(ActivityIndicator)(css({
  ml: 2,
}));

export const ButtonText = styled(TextVariant)(css({
  color: '#FFFFFF',
  textAlign: 'center',
}));

export const Footer = styled(TextVariant)(css({
  color: 'textPrimary',
  textAlign: 'center',
}));
