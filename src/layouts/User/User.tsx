import React, { FC } from 'react';
import { UserProps } from './types';
import {
  ButtonText,
  Description,
  Footer,
  Form,
  LargeButton,
  MainTitle,
  Page,
} from './styled';

export const User: FC<UserProps> = (props) => {
  const { title, form, message, footer, button } = props;
  return (
    <Page contentContainerStyle={{ flex: 1 }}>
      <MainTitle variant="largeTitleBold">{title}</MainTitle>
      <Description variant="bodyRegular">{message}</Description>
      <Form>
        {form}
      </Form>
      <LargeButton onPress={button.action}>
        <ButtonText variant="bodyBold">{button.text}</ButtonText>
      </LargeButton>
      <Footer variant="bodyRegular">{footer}</Footer>
    </Page>
  )
}