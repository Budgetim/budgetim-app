import { Category, StatisticsGroup } from '../types';
import { CategoryModel } from '../db/category';
import { db } from '../db';
import { CurrencyModel } from '../db/currency';
import { CurrencyCode, getRates } from './exchange';

const categoryModel = new CategoryModel(db);
const currencyModel = new CurrencyModel(db);

export const getCategories = async (): Promise<Category[]> => {
  const categories = await categoryModel.getCategories();
  return categories;
};

export const getCategory = async (id: number): Promise<Category> => {
  const category = await categoryModel.getCategory(id);
  return category;
};

export interface AddCategoryParams {
  title: string;
  description: string | null;
  color: string | null;
}

export const addCategory = async (params: AddCategoryParams): Promise<number> => {
  const id = await categoryModel.addCategory(params);
  return id;
};

export const deleteCategory = async (id: number) => {
  await categoryModel.deleteCategory(id);
};

export interface EditCategoryParams {
  id: number;
  title: string;
  description: string | null;
  color: string | null;
}

export const editCategory = async (params: EditCategoryParams): Promise<Category> => {
  await categoryModel.editCategory(params);
  const category = await categoryModel.getCategory(params.id);
  return category;
};

export interface GetStatisticsParams {
  month: number;
  year: number;
  baseCurrency: CurrencyCode;
}

export const getStatistics = async (params: GetStatisticsParams): Promise<StatisticsGroup[]> => {
  const currencies = await currencyModel.getUsedCurrencies();
  const ratesData = await getRates({
    base: params.baseCurrency,
    symbols: currencies.map(item => item.title),
  });

  const results = await Promise.all(
    currencies.map(async item => {
      const statistic = await categoryModel.showStatistic({ ...params, currencyId: item.id });
      return statistic.map(st => ({
        ...st,
        sum: +(st.sum / ratesData.rates[item.title]).toFixed(1),
      }));
    }),
  );

  const flatResult = results.flat();
  const res = [];
  flatResult.forEach(item => {
    const findedItem = res.find(r => r.categoryId === item.categoryId);
    if (findedItem) {
      findedItem.sum += item.sum;
    } else {
      res.push(item);
    }
  });

  const sortedRes = [...res.sort((item1, item2) => item2.sum - item1.sum)];
  return sortedRes;
};
