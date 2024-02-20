import React, { FC } from 'react';
import { TransactionCardProps } from './types';
import { Container, Content, SubTitleWrapper, SubTitle, Title, LeftContentWrapper, Label, Circle } from './styled';
import i18n from 'i18n-js';
import { useTheme } from 'styled-components/native';

export const TransactionCard: FC<TransactionCardProps> = props => {
  const { title, subTitle, label, tagColor, onPress } = props;
  const {
    colors: { textPrimary, textSecondary },
  } = useTheme();

  return (
    <Container onPress={onPress}>
      <Content>
        <LeftContentWrapper>
          <SubTitleWrapper>
            {!!tagColor && <Circle bg={tagColor.toLowerCase()} />}
            <SubTitle variant="footnoteRegular" numberOfLines={1}>
              {subTitle}
            </SubTitle>
          </SubTitleWrapper>
          <Title variant="subheadlineRegular" numberOfLines={1} color={!!title ? textPrimary : textSecondary}>
            {title || i18n.t('transactions.emptyTitle')}
          </Title>
        </LeftContentWrapper>
        {label && <Label variant="subheadlineBold">{label}</Label>}
      </Content>
    </Container>
  );
};
