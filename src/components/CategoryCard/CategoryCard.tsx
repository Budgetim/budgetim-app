import i18n from 'i18n-js';
import React, { FC } from 'react';

import { CategoryCardProps } from './types';
import { Container, Circle, Content, SubTitle, Title, ContentWrapper, Label } from './styled';
import { useTheme } from 'styled-components/native';

export const CategoryCard: FC<CategoryCardProps> = props => {
  const { title, description, label, tagColor, onPress } = props;
  const {
    colors: { textPrimary, textSecondary },
  } = useTheme();

  return (
    <Container onPress={onPress}>
      <Circle bg={tagColor} />
      <Content>
        <ContentWrapper>
          <Title variant="subheadlineRegular" numberOfLines={1} color={!!title ? textPrimary : textSecondary}>
            {title || i18n.t('transactions.emptyTitle')}
          </Title>
          {!!description && (
            <SubTitle variant="subheadlineRegular" numberOfLines={1}>
              {description}
            </SubTitle>
          )}
        </ContentWrapper>
        {label && <Label variant="subheadlineBold">{label}</Label>}
      </Content>
    </Container>
  );
};
