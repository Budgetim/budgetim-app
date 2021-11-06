import compareDesc from 'date-fns/compareDesc';
import format from 'date-fns/format';
import locale from 'date-fns/locale/en-US';

import { TransactionsContextState, TransactionsDispatchAction } from './types';
import { Transaction } from '../../types';

const currentYear = new Date().getFullYear();

export const expandData = (data: Transaction[]) => {
  const expandedData: { title: string, date: Date, data: Transaction[] }[] = [];

  data.forEach(transaction => {
    const currentDate = new Date(transaction.date);
    const formatDate = currentDate.getFullYear() === currentYear ? 'd MMMM' : 'd MMMM yyyy'
    const date = format(currentDate, formatDate, { locale });
    const foundedTransaction = expandedData.find(({ title }) => title === date)
    if (foundedTransaction) {
      foundedTransaction.data.push(transaction);
    } else {
      expandedData.push({ title: date, date: new Date(transaction.date), data: [transaction] });
    }
  });

  expandedData.sort((a, b) => (
    compareDesc(new Date(a.date), new Date(b.date))
  ));

  return expandedData.map(group => {
    return {
      title: group.title,
      data: group.data.sort((a, b) => a.id - b.id),
    }
  });
}

export const transactionsReducer = (state: TransactionsContextState, action: TransactionsDispatchAction) => {
  switch (action.type) {
    case 'setData': {
      const { data } = action.payload;
      return {
        ...state,
        isLoading: false,
        error: null,
        data,
        dataByDate: expandData(data),
      };
    }

    case 'deleteTransaction': {
      const { id } = action.payload;

      const filteredData = state.data.filter(item => item.id !== id);
      return {
        ...state,
        data: filteredData,
        dataByDate: expandData(filteredData),
      };
    }

    case 'editTransaction': {
      const { transaction } = action.payload;

      const updatedData = state.data.map(item => {
        if (item.id === transaction.id) {
          return transaction;
        }
        return item;
      });

      return {
        ...state,
        data: updatedData,
        dataByDate: expandData(updatedData),
      };
    }

    case 'addTransaction': {
      const {transaction} = action.payload;

      const updatedData = [...state.data, transaction];

      return {
        ...state,
        data: updatedData,
        dataByDate: expandData(updatedData),
      };
    }

    case 'setError': {
      const { error } = action.payload;
      return {
        ...state,
        isLoading: false,
        error,
        data: [],
        dataByDate: [],
      };
    }

    default: {
      throw new Error('Unhandled action type');
    }
  }
};
