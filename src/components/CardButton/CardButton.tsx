import React, { FC } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { CardButtonProps } from './types';

import { Container, Content } from './styled';
import { useTheme } from 'styled-components/native';

export const CardButton: FC<CardButtonProps> = (props) => {
  const { children, onPress } = props;
  const { colors: { systemGray01 } } = useTheme();
  return (
    <Container onPress={onPress}>
      <Content>
        {children}
      </Content>
      <Feather name="chevron-right" color={systemGray01} size={20} />
    </Container>
  );
};
