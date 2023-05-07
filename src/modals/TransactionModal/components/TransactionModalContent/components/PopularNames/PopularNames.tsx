import React, { FC } from 'react';
import { TextVariant } from '../../../../../../components/TextVariant';
import { Container, Item } from './styled';
import { getPopularNames } from '../../../../../../utils/getPopularNames';
import { PopularNamesProps } from './types';
import { useGetTransactions } from '../../../../../../hooks/transactions';

export const PopularNames: FC<PopularNamesProps> = ({ str, selectTitle }) => {
  const { data } = useGetTransactions();
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
