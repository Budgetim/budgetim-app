export interface DataItem {
  title: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
}

export interface InputListProps {
  data: DataItem[];
}