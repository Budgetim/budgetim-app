import { ReactNode } from 'react';

export interface CardsListProps<T> {
  data: ReadonlyArray<T>;
  renderItem: (item: T) => ReactNode;
}