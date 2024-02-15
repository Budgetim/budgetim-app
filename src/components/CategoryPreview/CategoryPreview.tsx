import React, { FC } from 'react';
import { CategoryPreviewProps } from './types';
import { Circle } from './styled';

export const CategoryPreview: FC<CategoryPreviewProps> = ({ color }) => {
  return <Circle bg={color} />;
};
