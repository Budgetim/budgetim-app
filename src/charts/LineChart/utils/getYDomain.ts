import maxBy from 'lodash/maxBy';
import { DataItemLineChart } from '../types';

interface GetYDomainProps {
  data: DataItemLineChart[];
}

export const getYDomain = ({ data }: GetYDomainProps) => {
  const max = maxBy(data, 'value')?.value || 0;
  return [0, max];
};
