import { CategoriesContextState, CategoriesDispatchAction } from './types';

export const categoriesReducer = (state: CategoriesContextState, action: CategoriesDispatchAction) => {

  switch (action.type) {
    case 'setData': {
      const { data } = action.payload;
      return {
        isLoading: false,
        error: null,
        data,
      };
    }

    case 'setError': {
      const {error} = action.payload;
      return {
        ...state,
        isLoading: false,
        error,
      };
    }

    case 'deleteCategory': {
      const { id } = action.payload;

      return {
        ...state,
        data: state.data.filter(item => item.id !== id),
      };
    }

    case 'editCategory': {
      const { category } = action.payload;

      return {
        ...state,
        data: state.data.map(item => {
          if (item.id === category.id) {
            return category;
          }
          return item;
        }),
      };
    }

    case 'addCategory': {
      const { category } = action.payload;

      return {
        ...state,
        data: [...state.data, category],
      };
    }

    default: {
      throw new Error('Unhandled action type');
    }
  }
};
