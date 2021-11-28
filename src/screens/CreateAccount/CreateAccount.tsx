import React, { FC, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import i18n from 'i18n-js';

import { User } from '../../layouts/User';
import { InputWithBorder } from '../../components/InputWithBorder';
import { register } from '../../api/user/register';
import { validateEmail } from '../../utils/validateEmail';
import { StackParamList } from '../types';
import { authentificate } from '../../api/user/authentificate';
import { useUserDispatch } from '../../contexts/user';

import { FooterLink } from './styled';

export const CreateAccount: FC<NativeStackScreenProps<StackParamList, 'CreateAccount'>> = ({ navigation }) => {
  const [name, setName] = useState('');
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
  }, [email, password, name]);

  const onRegister = async () => {
    setIsLoading(true);
    try {
      await register({ name, email, password });
      const user = await authentificate({ email, password });
      if (user.email === email) {
        dispatch({ type: 'setUser', payload: { user } });
        await SecureStore.setItemAsync('userToken', user.token);
      }
    } catch (e) {
      setError(i18n.t('createAccount.message.error'));
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
      onRegister();
    }
  };

  return (
    <User
      title={i18n.t('createAccount.title')}
      message={i18n.t('createAccount.subTitle')}
      error={error}
      form={
        <>
          <InputWithBorder
            variant="bodyRegular"
            defaultValue={name}
            onChangeText={setName}
            placeholder={i18n.t('createAccount.form.name')}
          />
          <InputWithBorder
            variant="bodyRegular"
            defaultValue={email}
            onChangeText={setEmail}
            placeholder={i18n.t('createAccount.form.email')}
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
            placeholder={i18n.t('createAccount.form.password')}
            hasWarning={isWarningPasssword}
            warningText={isWarningPasssword ? i18n.t('common.errors.requiredField') : undefined}
            secureTextEntry
          />
        </>
      }
      button={{
        text: i18n.t('createAccount.form.submit'),
        action: onSubmit,
        withLoader: isLoading,
      }}
      footer={
        <>
          {i18n.t('createAccount.message.accountQuestion')}{' '}
          <FooterLink variant="bodyBold" onPress={() => navigation.navigate('Login')}>
            {i18n.t('createAccount.link.signIn')}
          </FooterLink>
        </>
      }
    />
  );
};
