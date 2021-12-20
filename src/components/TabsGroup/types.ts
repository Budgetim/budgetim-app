export interface SelectGroupProps {
  activeIndex: number;
  onChangeIndex: (index: number) => void;
  data: {
    title: string;
  }[];
}