import React, { FC } from 'react';
import { TextVariant } from '../TextVariant';
import { Container } from './styled';

export const ErrorMessage: FC = ({ children }) => {
  return (
    <Container>
      <TextVariant variant="bodyRegular">{children}</TextVariant>
    </Container>
  )
}