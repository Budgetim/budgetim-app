import React, { FC } from 'react';
import { ColorPickerProps } from './types';
import { Container, CircleButton, Circle } from './styled';

export const ColorPicker: FC<ColorPickerProps> = ({ colors, value, onChange }) => {
  return (
    <Container>
      {colors.map(color => {
        return (
          <CircleButton key={color} active={value === color} onPress={() => onChange(color)}>
            <Circle bg={color} />
          </CircleButton>
        );
      })}
    </Container>
  );
};
