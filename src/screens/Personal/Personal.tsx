import React, { FC, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import i18n from 'i18n-js';

import { useUserDispatch, useUserState } from '../../contexts/user';
import { GroupList } from '../../components/GroupList';
import { InputList } from '../../components/InputList';
import { updatePassword } from '../../api/user/updatePassword';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { StackParamList } from '../types';

import { Container, Link, SignOutButton } from './styled';
import { EditPasswordModal } from './EditPasswordModal';

export const Personal: FC<NativeStackScreenProps<StackParamList, 'Personal'>> = ({ navigation }) => {
  const dispatch = useUserDispatch();
  const { token } = useUserState();
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);

  useErrorHandler(error);

  const closeModal = () => {
    setVisible(false);
  };

  const logOut = async () => {
    await SecureStore.deleteItemAsync('userToken');
    dispatch({ type: 'setToken', payload: { token: null } });
  };

  const changePassword = async () => {
    setIsLoading(true);
    try {
      await updatePassword({ password: value }, token);
    } catch(e) {
      setError(e);
    } finally {
      setIsLoading(false);
      closeModal();
    }
  }

  useEffect(() => {
    if (visible) {
      setValue('');
    }
  }, [visible]);

  return (
    <Container>
      <GroupList
        data={[
          {
            title: i18n.t('settings.personal.action.changePassword'),
            onPress: () => setVisible(true),
          },
        ]}
      />
      <SignOutButton onPress={logOut}>
        <Link variant="bodyRegular">{i18n.t('settings.personal.action.signOut')}</Link>
      </SignOutButton>
      <EditPasswordModal
        visible={visible}
        onClose={closeModal}
        onSave={changePassword}
        isLoading={isLoading}
        disable={value.length === 0}
      >
        <InputList
          data={[
            {
              title: i18n.t('settings.personal.form.password.name'),
              placeholder: i18n.t('settings.personal.form.password.placeholder'),
              value,
              setValue,
            }
          ]}
        />
      </EditPasswordModal>
    </Container>
  );
};
