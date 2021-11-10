import React, { FC, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';

import { User } from '../../layouts/User';
import { InputWithBorder } from '../../components/InputWithBorder';
import { authentificate } from '../../api/user/authentificate';
import { useAppDispatch } from '../../contexts/app';
import { StackParamList } from '../types';

import { FooterLink, ForgotLink } from './styled';

export const Login: FC<NativeStackScreenProps<StackParamList, 'Login'>> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const auth = async () => {
    setIsLoading(true);
    try {
      const user = await authentificate({ email, password });
      if (user.email === email) {
        dispatch({ type: 'setUser', payload: { user } });
        await SecureStore.setItemAsync('userToken', user.token);
      }
    } catch (error) {
      setError('Wrong email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <User
      title="Login"
      message="Welcome back, sign in to continue"
      error={error}
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
          <ForgotLink variant="bodyBold" onPress={() => navigation.navigate('PasswordReset')}>Forgot password?</ForgotLink>
        </>
      )}
      button={{
        text: 'Sign in',
        action: auth,
        withLoader: isLoading,
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
