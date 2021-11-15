import React, { FC, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';

import { useUserDispatch, useUserState } from '../../contexts/user';
import { GroupList } from '../../components/GroupList';

import { StackParamList } from '../types';
import { Container, Link, SignOutButton } from './styled';
import { EditPasswordModal } from './EditPasswordModal';
import { InputList } from '../../components/InputList';
import { updatePassword } from '../../api/user/updatePassword';
import { useErrorHandler } from '../../hooks/useErrorHandler';

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
            title: 'Change password',
            onPress: () => setVisible(true),
          },
        ]}
      />
      <SignOutButton onPress={logOut}>
        <Link variant="bodyRegular">Sign out</Link>
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
              title: 'New',
              placeholder: 'enter password',
              value,
              setValue,
            }
          ]}
        />
      </EditPasswordModal>
    </Container>
  );
};
