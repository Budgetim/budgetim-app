import React, { FC } from 'react';
import { CategoryPreviewProps } from './types';
import { Circle } from './styled';
import { useTheme } from 'styled-components/native';

export const CategoryPreview: FC<CategoryPreviewProps> = ({ color }) => {
  const {
    colors: { systemGray02 },
  } = useTheme();
  return <Circle bg={color || systemGray02} />;
};
