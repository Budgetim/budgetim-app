import { Action } from '../../types';

type SetTransactionModalVisible = Action<
  'setTransactionModalVisible',
  {
    isVisible: boolean;
  }
>;

type SetModalTransactionId = Action<
  'setModalTransactionId',
  {
    id: number;
  }
>;

type SetCategoryModalVisible = Action<
  'setCategoryModalVisible',
  {
    isVisible: boolean;
  }
>;

type SetModalCategoryId = Action<
  'setModalCategoryId',
  {
    id: number;
  }
>;

export type ModalsDispatchAction =
  | SetTransactionModalVisible
  | SetModalTransactionId
  | SetCategoryModalVisible
  | SetModalCategoryId;

export type ModalsDispatch = (action: ModalsDispatchAction) => void;

export interface ModalsContextState {
  transaction: {
    id: number | null;
    isVisible: boolean;
  };
  category: {
    id: number | null;
    isVisible: boolean;
  };
}
