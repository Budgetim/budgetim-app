import React, { FC } from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import typography from '../../theme/typography';

import { Container, Input, WarningText } from './styled';

interface InputWithBorderProps extends TextInputProps {
  variant: keyof typeof typography;
  hasWarning?: boolean;
  warningText?: string;
}

export const InputWithBorder: FC<InputWithBorderProps> = props => {
  const { hasWarning = false, warningText } = props;
  const {
    colors: { systemRed },
  } = useTheme();

  return (
    <Container>
      <Input {...props} error={hasWarning} placeholderTextColor={hasWarning ? systemRed : undefined} />
      {warningText && <WarningText variant="subheadlineRegular">{warningText}</WarningText>}
    </Container>
  );
};
