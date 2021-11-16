import React, { FC, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import i18n from 'i18n-js';

import { User } from '../../layouts/User';
import { InputWithBorder } from '../../components/InputWithBorder';
import { register } from '../../api/user/register';
import { StackParamList } from '../types';
import { authentificate } from '../../api/user/authentificate';
import { useUserDispatch } from '../../contexts/user';

import { FooterLink } from './styled';

export const CreateAccount: FC<NativeStackScreenProps<StackParamList, 'CreateAccount'>> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useUserDispatch();

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

  return (
    <User
      title={i18n.t('createAccount.title')}
      message={i18n.t('createAccount.subTitle')}
      error={error}
      form={(
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
          />
          <InputWithBorder
            variant="bodyRegular"
            defaultValue={password}
            onChangeText={setPassword}
            placeholder={i18n.t('createAccount.form.password')}
            secureTextEntry
          />
        </>
      )}
      button={{
        text: i18n.t('createAccount.form.submit'),
        action: onRegister,
        withLoader: isLoading,
      }}
      footer={(
        <>
          {i18n.t('createAccount.message.accountQuestion')}{' '}
          <FooterLink variant="bodyBold" onPress={() => navigation.navigate('Login')}>{i18n.t('createAccount.link.signIn')}</FooterLink>
        </>
      )}
    />
  );
};
