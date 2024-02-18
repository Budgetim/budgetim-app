import { Action } from '../../types';

type SetTransactionModal = Action<
  'setTransactionModal',
  | {
      id: number;
    }
  | undefined
>;

type CloseTransactionModal = Action<'closeTransactionModal', undefined>;

type SetCategoryModal = Action<
  'setCategoryModal',
  | {
      id: number;
    }
  | undefined
>;

type CloseCategoryModal = Action<'closeCategoryModal', undefined>;

type SetCurrencyModal = Action<
  'setCurrencyModal',
  | {
      id: number;
    }
  | undefined
>;

type CloseCurrencyModal = Action<'closeCurrencyModal', undefined>;

export type ModalsDispatchAction =
  | SetTransactionModal
  | CloseTransactionModal
  | SetCategoryModal
  | CloseCategoryModal
  | SetCurrencyModal
  | CloseCurrencyModal;

export type ModalsDispatch = (action: ModalsDispatchAction) => void;

export interface ModalsContextState {
  transaction: {
    id: number | null; // если null, то это создание новой транзакции
    isVisible: boolean;
  };
  category: {
    id: number | null; // если null, то это создание новой категории
    isVisible: boolean;
  };
  currency: {
    id: number | null; // если null, то это создание новой валюты
    isVisible: boolean;
  };
}
