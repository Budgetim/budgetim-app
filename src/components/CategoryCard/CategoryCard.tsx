import React, { FC } from 'react';
import { useTheme } from 'styled-components/native';

import { CATEGORY_COLOR_DEFAULT } from '../../constants';

import { CategoryCardProps } from './types';
import { Container, Circle, Content, SubTitle, Title, ContentWrapper, Label } from './styled';

export const CategoryCard: FC<CategoryCardProps> = props => {
  const { colors } = useTheme();
  const { title = 'no categories', description, label, chart, tagColor, onPress } = props;
  const color = tagColor ? tagColor.toLowerCase() : colors[CATEGORY_COLOR_DEFAULT];

  return (
    <Container onPress={onPress}>
      <Circle bg={color} />
      <Content>
        <ContentWrapper>
          <Title variant="subheadlineRegular" numberOfLines={1}>
            {title}
          </Title>
          {!!description && (
            <SubTitle variant="subheadlineRegular" numberOfLines={1}>
              {description}
            </SubTitle>
          )}
        </ContentWrapper>
        {chart}
        {label && <Label variant="subheadlineBold">{label}</Label>}
      </Content>
    </Container>
  );
};
