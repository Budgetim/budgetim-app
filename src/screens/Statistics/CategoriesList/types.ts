import { StatisticsItem } from '../Statistics';

export interface CategoriesListProps {
  data: StatisticsItem[];
  month: number;
  year: number;
}