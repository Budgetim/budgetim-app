import React, { FC, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { User } from '../../layouts/User';
import { InputWithBorder } from '../../components/InputWithBorder';
import { register } from '../../api/user/register';
import { StackParamList } from '../types';

import { FooterLink } from './styled';

export const CreateAccount: FC<NativeStackScreenProps<StackParamList, 'CreateAccount'>> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const action = async () => {
    register({ name, email, password }, (user) => {

    });
  };

  return (
    <User
      title="Create account"
      message="Nec nihil affert partiendo ne, quo no iisque etiam tacimates sed conceptam."
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
