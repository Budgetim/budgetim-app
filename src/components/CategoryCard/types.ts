import { ReactNode } from 'react';

export interface CategoryCardProps {
  title?: string | null;
  description?: string | null;
  chart?: ReactNode;
  label?: string;
  tagColor: string;
  onPress?: () => void;
}
