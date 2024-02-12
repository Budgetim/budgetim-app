import { StatisticsItem } from '../../../types';

export interface CategoriesListProps {
  data: StatisticsItem[];
  month: number;
  year: number;
  currencySymbol: string;
}
