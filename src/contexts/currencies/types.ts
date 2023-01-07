import { Action, Currency } from '../../types';

type SetDataAction = Action<
  'setData',
  {
    data: Currency[];
  }
>;

type SetErrorAction = Action<
  'setError',
  {
    error: string;
  }
>;

export type CurrenciesDispatchAction = SetDataAction | SetErrorAction;

export type CurrenciesDispatch = (action: CurrenciesDispatchAction) => void;

export interface CurrenciesContextState {
  isLoading: boolean;
  error: string | null;
  data: Currency[];
}
