import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

import { useUserDispatch } from '../contexts/user';

export const useErrorHandler = (error: string | null) => {
  const dispatch = useUserDispatch();
  useEffect(() => {
    if (error === '403') {
      const handleError = async () => {
        await SecureStore.deleteItemAsync('userToken');
        dispatch({ type: 'setToken', payload: { token: null } });
      }

      handleError();
    }
  }, [error])
}