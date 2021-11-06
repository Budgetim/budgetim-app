import { Action } from '../../types';

type SetTransactionModalVisible = Action<'setTransactionModalVisible', {
  isVisible: boolean;
}>

type SetModalTransactionId = Action<'setModalTransactionId', {
  id: number;
}>

export type ModalsDispatchAction =
  SetTransactionModalVisible |
  SetModalTransactionId;

export type ModalsDispatch = (action: ModalsDispatchAction) => void;

export interface ModalsContextState {
  transaction: {
    id: number | null;
    isVisible: boolean;
  },
}
