import React, { FC } from 'react';
import { TransactionCardProps } from './types';
import { Container, Content, SubTitleWrapper, SubTitle, Title, LeftContentWrapper, Label, Circle } from './styled';

export const TransactionCard: FC<TransactionCardProps> = props => {
  const { title, subTitle, label, tagColor, onPress } = props;

  return (
    <Container onPress={onPress}>
      <Content>
        <LeftContentWrapper>
          <SubTitleWrapper>
            <Circle bg={tagColor.toLowerCase()} />
            <SubTitle variant="footnoteRegular" numberOfLines={1}>
              {subTitle}
            </SubTitle>
          </SubTitleWrapper>
          <Title variant="subheadlineRegular" numberOfLines={1}>
            {title}
          </Title>
        </LeftContentWrapper>
        {label && <Label variant="subheadlineBold">{label}</Label>}
      </Content>
    </Container>
  );
};
