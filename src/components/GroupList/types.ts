export interface DataItem {
  title: string;
  onPress: () => void;
}

export interface GroupListProps {
  data: DataItem[];
}