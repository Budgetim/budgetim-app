import React, { FC, useState } from 'react';
import Swipeout from 'react-native-swipeout';

import { Transaction } from '../../types';

import { TransactionModal } from '../TransactionModal';
import { useAppDispatch, useUser } from '../../appContext';
import { deleteTransaction } from '../../api/transaction/deleteTransaction';
import { CardDetails } from '../CardDetails';
import { CardButton } from '../CardButton';

import { useTheme } from 'styled-components/native';
import { separateThousands } from '../../utils/separateThousands';

export const TransactionCard: FC<Transaction> = (props) => {
  const { title, category, price, id} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const { colors: { bgPrimary, systemRed, textPrimary }} = useTheme();
  const dispatch = useAppDispatch();
  const { token } = useUser();

  const onDelete = () => {
    deleteTransaction(
      id,
      () => dispatch({ type: 'deleteTransaction', payload: { id }}),
      token,
    );
  };

  return (
    <Swipeout
      backgroundColor={bgPrimary}
      right={[{
        text: 'удалить',
        color: textPrimary,
        backgroundColor: systemRed,
        onPress: onDelete,
      }]}
    >
      <CardButton onPress={() => setModalVisible(true)}>
        <CardDetails
          title={title}
          subTitle={category.title || 'Без категории'}
          tagColor={category.color}
          label={`${separateThousands(+price)} ₽`}
        />
      </CardButton>
      <TransactionModal visible={modalVisible} setVisible={setModalVisible} transaction={props} />
    </Swipeout>
  );
};
