import React, { useState } from 'react';

import { Page, MainTitle, Description, InputWithBorder, LargeButton, ButtonText, Form, Content } from './styled';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Page contentContainerStyle={{ flex: 1 }}>
      <MainTitle variant="largeTitleBold">Войти</MainTitle>
      <Description variant="bodyRegular">Добро пожаловать! Введите email и пароль</Description>
      <Form>
        <InputWithBorder
          variant="bodyRegular"
          defaultValue={email}
          onChangeText={setEmail}
          placeholder="Email"
        />
        <InputWithBorder
          variant="bodyRegular"
          defaultValue={password}
          onChangeText={setPassword}
          placeholder="Password"
        />
      </Form>
      <LargeButton onPress={() => {}}>
        <ButtonText variant="bodyBold">Войти</ButtonText>
      </LargeButton>
    </Page>
  )
}