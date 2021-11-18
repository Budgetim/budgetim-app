import { DataItemLineChart } from '../types';

export interface GetDataLinesProps {
  data: DataItemLineChart[];
  categories: string[];
}

export const getDataLines = ({
  data,
  categories,
}: GetDataLinesProps) => {
  return data.map((item, index) => ({
    value: item.value,
    category: categories[index],
  }));
};
