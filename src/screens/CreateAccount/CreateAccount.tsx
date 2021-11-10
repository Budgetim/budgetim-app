import React, { FC, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { User } from '../../layouts/User';
import { InputWithBorder } from '../../components/InputWithBorder';
import { register } from '../../api/user/register';
import { StackParamList } from '../types';

import { FooterLink } from './styled';
import { authentificate } from '../../api/user/authentificate';
import * as SecureStore from 'expo-secure-store';
import { useAppDispatch } from '../../contexts/app';

export const CreateAccount: FC<NativeStackScreenProps<StackParamList, 'CreateAccount'>> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const action = async () => {
    setIsLoading(true);
    try {
      await register({ name, email, password });
      const user = await authentificate({ email, password });
      if (user.email === email) {
        dispatch({ type: 'setUser', payload: { user } });
        await SecureStore.setItemAsync('userToken', user.token);
      }
    } catch (e) {
      setError('The entered data is incorrect');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <User
      title="Create account"
      message="Enter your information"
      error={error}
      form={(
        <>
          <InputWithBorder
            variant="bodyRegular"
            defaultValue={name}
            onChangeText={setName}
            placeholder="Name"
          />
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
        text: 'Register',
        action,
        withLoader: isLoading,
      }}
      footer={(
        <>
          Already have an account?{' '}
          <FooterLink variant="bodyBold" onPress={() => navigation.navigate('Login')}>Sign In</FooterLink>
        </>
      )}
    />
  );
};
