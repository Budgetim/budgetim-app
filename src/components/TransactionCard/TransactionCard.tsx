import React, { FC } from 'react';
import { TransactionCardProps } from './types';

import { Container, Content, SubTitleWrapper, SubTitle, Title, LeftContentWrapper, Label, Circle } from './styled';
import { useTheme } from 'styled-components/native';
import { CATEGORY_COLOR_DEFAULT } from '../../constants';

export const TransactionCard: FC<TransactionCardProps> = (props) => {
  const { colors } = useTheme();
  const { title, subTitle, label, tagColor, onPress } = props;
  const color = tagColor ? tagColor.toLowerCase() : colors[CATEGORY_COLOR_DEFAULT];

  return (
    <Container onPress={onPress}>
      <Content>
        <LeftContentWrapper>
          <SubTitleWrapper>
            <Circle bg={color} />
            <SubTitle variant="footnoteRegular" numberOfLines={1}>{subTitle}</SubTitle>
          </SubTitleWrapper>
          <Title variant="subheadlineRegular" numberOfLines={1}>{title}</Title>
        </LeftContentWrapper>
        {label && <Label variant="subheadlineBold">{label}</Label>}
      </Content>
    </Container>
  );
};
