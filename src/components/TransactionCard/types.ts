export interface TransactionCardProps {
  title: string;
  subTitle: string;
  label?: string;
  tagColor?: string | null;
  onPress?: () => void;
}