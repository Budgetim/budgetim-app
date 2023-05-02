import React, { FC } from 'react';
import { TextVariant } from '../../../TextVariant';
import { Container, Item } from './styled';
import { getPopularNames } from '../../../../utils/getPopularNames';
import { PopularNamesProps } from './types';
import { useQuery } from '@tanstack/react-query';
import { getTransactions } from '../../../../api/transactions/getTransactions';

export const PopularNames: FC<PopularNamesProps> = ({ str, selectTitle }) => {
  const { data } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => getTransactions({}),
  });
  const names = getPopularNames(data || [], str);
  return (
    <Container>
      {names.map((name, index, array) => {
        return (
          <Item key={name} borderRight={index !== array.length - 1} onPress={() => selectTitle(name)}>
            <TextVariant variant="bodyRegular">{name}</TextVariant>
          </Item>
        );
      })}
    </Container>
  );
};
