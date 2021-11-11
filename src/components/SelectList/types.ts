export interface DataItem {
  id: number;
  title: string;
  color?: string;
  isActive: boolean;
}

export interface SelectListProps {
  backgroundColor?: string;
  data: DataItem[];
  onSelect: (id: number) => void;
}