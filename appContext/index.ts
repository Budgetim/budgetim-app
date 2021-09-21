import { createContext } from 'react';
import { AppContextState, AppDispatch } from './types';

export const AppStateContext = createContext<AppContextState | undefined>(undefined);
export const AppDispatchContext = createContext<AppDispatch | undefined>(undefined);

export { useAppState } from './useAppState';
export { useAppDispatch } from './useAppDispatch';
export { AppProvider } from './AppProvider';
