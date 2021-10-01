import React, { FC, useState } from 'react';
import { User } from '../../layouts/User';
import { InputWithBorder } from '../../components/InputWithBorder';
import { FooterLink } from './styled';

export const CreateAccount: FC<any> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        text: 'Sign in',
        action: () => {},
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
