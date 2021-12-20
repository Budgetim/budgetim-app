import React, { FC, Fragment } from 'react';
import { SelectGroupProps } from './types';
import { List, Item, Button, Title, Separator } from './styled';

export const SelectGroup: FC<SelectGroupProps> = ({ data, onChangeIndex, activeIndex }) => {
  return (
    <List>
      {data.map((item, index) => {
        return (
          <Fragment key={index}>
            <Item>
              <Button active={index === activeIndex} onPress={() => onChangeIndex(index)}>
                <Title numberOfLines={1} variant="subheadlineRegular">
                  {item.title}
                </Title>
              </Button>
            </Item>
            {index !== data.length - 1 && <Separator visible={index !== activeIndex && index !== activeIndex - 1} />}
          </Fragment>
        );
      })}
    </List>
  );
};
