import React, { FC, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import i18n from 'i18n-js';

import { User } from '../../layouts/User';
import { InputWithBorder } from '../../components/InputWithBorder';
import { StackParamList } from '../types';
import { resetPassword } from '../../api/user/resetPassword';

export const PasswordReset: FC<NativeStackScreenProps<StackParamList, 'PasswordReset'>> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = async () => {
    setIsLoading(true);
    try {
      await resetPassword({ email });
      navigation.navigate('Login');
    } catch (e) {
      setError(i18n.t('passwordReset.message.error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <User
      title={i18n.t('passwordReset.mainTitle')}
      message={i18n.t('passwordReset.subTitle')}
      error={error}
      form={(
        <>
          <InputWithBorder
            variant="bodyRegular"
            defaultValue={email}
            onChangeText={setEmail}
            placeholder={i18n.t('passwordReset.form.email')}
            autoCompleteType="email"
          />
        </>
      )}
      button={{
        text: i18n.t('passwordReset.form.submit'),
        action: reset,
        withLoader: isLoading,
      }}
    />
  );
};
