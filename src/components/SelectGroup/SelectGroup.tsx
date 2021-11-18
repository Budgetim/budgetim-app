import React, { FC } from 'react';
import { SelectGroupProps } from './types';
import { List, Button, Title } from './styled';

export const SelectGroup: FC<SelectGroupProps> = ({ data, onChangeIndex, activeIndex }) => {
  return (
    <List>
      {data.map((item, index) => {
        return (
          <Button
            key={index}
            active={index === activeIndex}
            onPress={() => onChangeIndex(index)}
          >
            <Title variant="subheadlineBold">{item.title}</Title>
          </Button>
        );
      })}
    </List>
  );
}