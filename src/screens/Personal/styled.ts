import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import css from '@styled-system/css';
import { TextVariant } from '../../components/TextVariant';

export const Container = styled(ScrollView)(css({
  px: 5,
  py: 5,
}));

export const Link = styled(TextVariant)(css({
  color: 'textPrimary',
}));