import React, { FC } from 'react';
import { CardDetailsProps } from './types';

import { Container, SubTitleWrapper, SubTitle, Title, LeftContentWrapper, Label, Circle } from './styled';
import { useTheme } from 'styled-components/native';

export const CardDetails: FC<CardDetailsProps> = (props) => {
  const { colors: { systemGray05 } } = useTheme();
  const { title, subTitle, label, tagColor = systemGray05 } = props;
  return (
    <Container>
      <LeftContentWrapper>
        <SubTitleWrapper>
          <Circle bg={tagColor} />
          <SubTitle variant="footnoteRegular" numberOfLines={1}>{subTitle}</SubTitle>
        </SubTitleWrapper>
        <Title variant="subheadlineRegular" numberOfLines={1}>{title}</Title>
      </LeftContentWrapper>
      {label && <Label variant="subheadlineBold">{label}</Label>}
    </Container>
  );
};
