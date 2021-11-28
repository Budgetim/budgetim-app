import { View } from 'react-native';
import styled from 'styled-components/native';
import css from '@styled-system/css';
import { Input as InputComponent } from '../Input';
import { TextVariant } from '../TextVariant';

interface InputWithBorderProps {
  error?: boolean;
}

export const Container = styled(View)(css({}));

export const Input = styled(InputComponent)<InputWithBorderProps>(({ error }) =>
  css({
    borderColor: error ? 'systemRed' : 'systemGray05',
    borderBottomWidth: 0.5,
    py: 5,
  }),
);

export const WarningText = styled(TextVariant)(
  css({
    color: 'systemRed',
    mt: 1,
  }),
);
