import React, { FC, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { User } from '../../layouts/User';
import { InputWithBorder } from '../../components/InputWithBorder';
import { StackParamList } from '../types';

import { resetPassword } from '../../api/user/resetPassword';

export const PasswordReset: FC<NativeStackScreenProps<StackParamList, 'Login'>> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = async () => {
    setIsLoading(true);
    try {
      await resetPassword({ email });
      navigation.navigate('Login');
    } catch (e) {
      setError('Incorrect email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <User
      title="Forgot password?"
      message="Enter your email. We will send you a new password by email"
      error={error}
      form={(
        <>
          <InputWithBorder
            variant="bodyRegular"
            defaultValue={email}
            onChangeText={setEmail}
            placeholder="Email"
          />
        </>
      )}
      button={{
        text: 'Reset',
        action: reset,
        withLoader: isLoading,
      }}
    />
  );
};
