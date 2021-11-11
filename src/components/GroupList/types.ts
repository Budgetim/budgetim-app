export interface DataItem {
  title: string;
  onPress: () => void;
  variant?: string;
  type?: 'categories' | 'person' | 'currency';
}

export interface GroupListProps {
  data: DataItem[];
}