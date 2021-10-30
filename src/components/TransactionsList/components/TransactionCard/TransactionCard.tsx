import React, { FC, useState } from 'react';
import Swipeout from 'react-native-swipeout';

import { Transaction } from '../../../../types';

import { TransactionModal } from '../../../TransactionModal';
import { useUser } from '../../../../appContext';
import { deleteTransaction } from '../../../../api/transaction/deleteTransaction';
import { CardDetails } from '../../../CardDetails';
import { CardButton } from '../../../CardButton';

import { useTheme } from 'styled-components/native';
import { separateThousands } from '../../../../utils/separateThousands';
import { useTransactionsDispatch } from '../../../../constexts/transactions';

export const TransactionCard: FC<Transaction> = (props) => {
  const { title, category, price, id} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const { colors: { bgPrimary, systemRed, textPrimary }} = useTheme();
  const dispatch = useTransactionsDispatch();
  const { token } = useUser();

  const onDelete = async () => {
    await deleteTransaction(id, token);
    dispatch({ type: 'deleteTransaction', payload: { id }})
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