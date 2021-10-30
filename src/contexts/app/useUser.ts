import { useAppState } from './useAppState';

export const useUser = () => {
  const { user } = useAppState();
  return user;
};