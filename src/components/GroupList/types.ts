export interface DataItem {
  title: string;
  onPress: () => void;
  variant?: string;
  type?: 'categories' | 'person' | 'currency' | 'periods';
}

export interface GroupListProps {
  data: DataItem[];
}
