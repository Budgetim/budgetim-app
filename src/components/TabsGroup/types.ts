export interface SelectGroupProps {
  activeIndex: number;
  onChangeIndex: (index: number) => void;
  data: {
    disabled?: boolean;
    title: string;
  }[];
}
