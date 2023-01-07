import { StatisticsItem } from '../../screens/StatisticsByDates/StatisticsInfo';
import { CategoryModel } from '../../db/category';
import { db } from '../../db';

interface GetStatisticsParams {
  month: number;
  year: number;
  currencyId: number;
}

export const getStatistics = async (params: GetStatisticsParams): Promise<StatisticsItem[]> => {
  const categoryModel = new CategoryModel(db);
  const statistic = await categoryModel.showStatistic(params);
  return statistic;
};
