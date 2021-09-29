import React, { FC } from 'react';
import { CardDetailsProps } from './types';

import { Container, SubTitle, Title, LeftContentWrapper, Label } from './styled';

export const CardDetails: FC<CardDetailsProps> = (props) => {
  const { title, subTitle, label } = props;
  return (
    <Container>
      <LeftContentWrapper>
        <SubTitle variant="footnoteRegular" numberOfLines={1}>{subTitle}</SubTitle>
        <Title variant="subheadlineRegular" numberOfLines={1}>{title}</Title>
      </LeftContentWrapper>
      {label && <Label variant="footnoteRegular">{label}</Label>}
    </Container>
  );
};
