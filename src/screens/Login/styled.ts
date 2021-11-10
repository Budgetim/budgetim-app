import styled from 'styled-components/native';
import { TextVariant } from '../../components/TextVariant';
import css from '@styled-system/css';

export const FooterLink = styled(TextVariant)(css({
  color: 'systemBlue',
}));

export const ForgotLink = styled(TextVariant)(css({
  color: 'systemBlue',
  textAlign: 'right',
  mt: 4,
}));
