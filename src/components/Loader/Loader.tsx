import React, { FC } from 'react';

import { Container } from './styled';
import { ActivityIndicator } from 'react-native';


export const Loader: FC = () => {
  return (
    <Container>
      <ActivityIndicator />
    </Container>
  )
}