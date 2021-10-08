import styled from 'styled-components/native';
import css from '@styled-system/css';

import { TextVariant } from '../../components/TextVariant';

export const Item = styled(TextVariant)(css({
  color: 'textPrimary',
  mb: 5,
}));