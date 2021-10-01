import styled from 'styled-components/native';
import css from '@styled-system/css';
import { Input } from '../Input';

export const InputWithBorder = styled(Input)(css({
  borderColor: 'systemGray05',
  borderBottomWidth: 0.5,
  py: 5,
}));
