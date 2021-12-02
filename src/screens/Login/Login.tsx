import React, { FC, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import i18n from 'i18n-js';

import { User } from '../../layouts/User';
import { InputWithBorder } from '../../components/InputWithBorder';
import { authentificate } from '../../api/user/authentificate';
import { useUserDispatch } from '../../contexts/user';
import { validateEmail } from '../../utils/validateEmail';
import { StackParamList } from '../types';

import { FooterLink, ForgotLink } from './styled';

export const Login: FC<NativeStackScreenProps<StackParamList, 'Login'>> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isWarningEmail, setIsWarningEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [isWarningPasssword, setIsWarningPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useUserDispatch();

  useEffect(() => {
    setIsWarningEmail(false);
    setIsWarningPassword(false);
    setError(null);
  }, [email, password]);

  const auth = async () => {
    setIsLoading(true);
    try {
      const user = await authentificate({ email, password });
      if (user.email === email) {
        dispatch({ type: 'setUser', payload: { user } });
        await SecureStore.setItemAsync('userToken', user.token);
      }
    } catch (error) {
      setError(i18n.t('login.message.error'));
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = () => {
    let incorrectEmail = false;
    let incorrectPassword = false;
    if (!validateEmail(email)) {
      incorrectEmail = true;
      setIsWarningEmail(incorrectEmail);
    }
    if (!password) {
      incorrectPassword = true;
      setIsWarningPassword(incorrectPassword);
    }

    if (!incorrectEmail && !incorrectPassword) {
      auth();
    }
  };

  return (
    <User
      title={i18n.t('login.title')}
      message={i18n.t('login.subTitle')}
      error={error}
      form={
        <>
          <InputWithBorder
            variant="bodyRegular"
            defaultValue={email}
            onChangeText={setEmail}
            placeholder={i18n.t('login.form.email')}
            autoCompleteType="email"
            hasWarning={isWarningEmail}
            warningText={
              isWarningEmail
                ? !email
                  ? i18n.t('common.errors.requiredField')
                  : i18n.t('createAccount.message.incorrectEmail')
                : undefined
            }
          />
          <InputWithBorder
            variant="bodyRegular"
            defaultValue={password}
            onChangeText={setPassword}
            placeholder={i18n.t('login.form.password')}
            autoCompleteType="password"
            hasWarning={isWarningPasssword}
            warningText={isWarningPasssword ? i18n.t('common.errors.requiredField') : undefined}
            secureTextEntry
          />
          <ForgotLink variant="bodyBold" onPress={() => navigation.navigate('PasswordReset')}>
            {i18n.t('login.link.passwordReset')}
          </ForgotLink>
        </>
      }
      button={{
        text: i18n.t('login.form.submit'),
        action: onSubmit,
        withLoader: isLoading,
      }}
      footer={
        <>
          {i18n.t('login.message.accountQuestion')}{' '}
          <FooterLink variant="bodyBold" onPress={() => navigation.navigate('CreateAccount')}>
            {i18n.t('login.link.createAccount')}
          </FooterLink>
        </>
      }
    />
  );
};
