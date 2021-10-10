import React, { FC, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';

import { User } from '../../layouts/User';
import { InputWithBorder } from '../../components/InputWithBorder';
import { authentificate } from '../../api/user/authentificate';
import { useAppDispatch } from '../../appContext';
import { StackParamList } from '../types';

import { FooterLink } from './styled';

export const Login: FC<NativeStackScreenProps<StackParamList, 'Login'>> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const auth = async () => {
    authentificate({ email, password }, (user) => {
      if (user.email === email) {
        dispatch({ type: 'setUser', payload: { user } });
        SecureStore.setItemAsync('userToken', user.token);
      }
    });
  };

  return (
    <User
      title="Login"
      message="Welcome back, sign in to continue"
      form={(
        <>
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
        </>
      )}
      button={{
        text: 'Sign in',
        action: auth,
      }}
      footer={(
        <>
          Don’t have an account?{' '}
          <FooterLink variant="bodyBold" onPress={() => navigation.navigate('CreateAccount')}>Create account</FooterLink>
        </>
      )}
    />
  );
};
