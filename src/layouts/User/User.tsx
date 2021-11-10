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
  Loader,
  ErrorMessage,
} from './styled';

export const User: FC<UserProps> = (props) => {
  const { title, form, message, footer, error, button: { withLoader = false, action, text } } = props;
  return (
    <Page contentContainerStyle={{ flex: 1 }}>
      <MainTitle variant="largeTitleBold">{title}</MainTitle>
      <Description variant="bodyRegular">{message}</Description>
      {error && <ErrorMessage variant="bodyRegular">{error}</ErrorMessage>}
      <Form>
        {form}
      </Form>
      <LargeButton onPress={action}>
        <ButtonText variant="bodyBold">{text}</ButtonText>
        {withLoader && <Loader />}
      </LargeButton>
      {footer && <Footer variant="bodyRegular">{footer}</Footer>}
    </Page>
  )
}