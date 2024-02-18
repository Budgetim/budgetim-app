import React from 'react';

export interface DataItem {
  id: number;
  title: string;
  titleColor: string;
  subtitle?: string | null;
  leftContent?: React.ReactNode;
  rightText?: string;
  rightContent?: React.ReactNode;
  hasArrow?: boolean;
  onPress?: () => void;
  onDelete?: () => void;
}

export interface MixedListProps {
  title?: string;
  data: DataItem[];
}
