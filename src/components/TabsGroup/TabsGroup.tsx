import React, { FC } from 'react';
import { SelectGroupProps } from './types';
import { List, Button, ButtonWrapper, Title, Line } from './styled';

export const TabsGroup: FC<SelectGroupProps> = ({ data, onChangeIndex, activeIndex }) => {
  return (
    <List>
      {data.map((item, index) => {
        return (
          <ButtonWrapper key={index}>
            <Button onPress={() => onChangeIndex(index)} disabled={!!item?.disabled}>
              <Title active={index === activeIndex} variant="subheadlineBold">
                {item.title}
              </Title>
            </Button>
            {index === activeIndex && <Line />}
          </ButtonWrapper>
        );
      })}
    </List>
  );
};
