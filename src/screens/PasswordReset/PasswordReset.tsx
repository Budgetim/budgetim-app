import React, { FC, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import i18n from 'i18n-js';

import { User } from '../../layouts/User';
import { InputWithBorder } from '../../components/InputWithBorder';
import { validateEmail } from '../../utils/validateEmail';
import { StackParamList } from '../types';
import { resetPassword } from '../../api/user/resetPassword';

export const PasswordReset: FC<NativeStackScreenProps<StackParamList, 'PasswordReset'>> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isWarningEmail, setIsWarningEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsWarningEmail(false);
    setError(null);
  }, [email]);

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

  const onSubmit = () => {
    let incorrectEmail = false;
    if (!validateEmail(email)) {
      incorrectEmail = true;
      setIsWarningEmail(incorrectEmail);
    }

    if (!incorrectEmail) {
      reset();
    }
  };

  return (
    <User
      title={i18n.t('passwordReset.mainTitle')}
      message={i18n.t('passwordReset.subTitle')}
      error={error}
      form={
        <>
          <InputWithBorder
            variant="bodyRegular"
            defaultValue={email}
            onChangeText={setEmail}
            placeholder={i18n.t('passwordReset.form.email')}
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
        </>
      }
      button={{
        text: i18n.t('passwordReset.form.submit'),
        action: onSubmit,
        withLoader: isLoading,
      }}
    />
  );
};
