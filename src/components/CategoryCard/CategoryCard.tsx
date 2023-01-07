import i18n from 'i18n-js';
import React, { FC } from 'react';

import { CategoryCardProps } from './types';
import { Container, Circle, Content, SubTitle, Title, ContentWrapper, Label } from './styled';

export const CategoryCard: FC<CategoryCardProps> = props => {
  const { title, description, label, chart, tagColor, onPress } = props;

  return (
    <Container onPress={onPress}>
      <Circle bg={tagColor} />
      <Content>
        <ContentWrapper>
          <Title variant="subheadlineRegular" numberOfLines={1}>
            {title || i18n.t('transactions.emptyCategory')}
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
