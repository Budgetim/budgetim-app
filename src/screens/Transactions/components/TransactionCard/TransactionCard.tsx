import React, { FC, useState } from 'react';
import Swipeout from 'react-native-swipeout';

import { Transaction } from '../../../../types';

import { TransactionModal } from '../TransactionModal/TransactionModal';
import { useAppDispatch } from '../../../../appContext';
import { deleteTransaction } from '../../../../api/transaction/deleteTransaction';
import { CardDetails } from '../../../../components/CardDetails';
import { CardButton } from '../../../../components/CardButton';

import { useTheme } from 'styled-components/native';

export const TransactionCard: FC<Transaction> = (props) => {
  const { title, category, price, id} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const { colors: { bgPrimary, systemRed, textPrimary }} = useTheme();
  const dispatch = useAppDispatch();

  const onDelete = () => {
    deleteTransaction(
      id,
      () => dispatch({ type: 'deleteTransaction', payload: { id }})
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
          subTitle={category.title}
          tagColor={category.color}
          label={`${+price} ₽`}
        />
      </CardButton>
      <TransactionModal {...props} visible={modalVisible} setVisible={setModalVisible} />
    </Swipeout>
  );
};
