import React, { FC } from 'react';
import { CardButtonProps } from './types';

import { Container, Content } from './styled';

export const CardButton: FC<CardButtonProps> = (props) => {
  const { children, onPress } = props;
  return (
    <Container onPress={onPress}>
      <Content>
        {children}
      </Content>
    </Container>
  );
};
