import React, { FC, memo } from 'react';
import Swipeout from 'react-native-swipeout';
import { useTheme } from 'styled-components/native';

import { Transaction } from '../../../../types';

import { useUser } from '../../../../contexts/app';
import { deleteTransaction } from '../../../../api/transaction/deleteTransaction';
import { TransactionCard } from '../../../TransactionCard';

import { separateThousands } from '../../../../utils/separateThousands';
import { useTransactionsDispatch } from '../../../../contexts/transactions';
import { useModalsDispatch } from '../../../../contexts/modals';

export const Card: FC<Transaction> = memo((props) => {
  const { title, category, price, id } = props;
  const { colors: { bgPrimary, systemRed, textPrimary }} = useTheme();
  const modalsDispatch = useModalsDispatch();
  const transactionsDispatch = useTransactionsDispatch();
  const { token } = useUser();

  const onDelete = async () => {
    await deleteTransaction(id, token);
    transactionsDispatch({ type: 'deleteTransaction', payload: { id }})
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
      <TransactionCard
        onPress={() => {
          modalsDispatch({ type: 'setModalTransactionId', payload: { id }});
          modalsDispatch({ type: 'setTransactionModalVisible', payload: { isVisible: true } });
        }}
        title={title}
        subTitle={category.title || 'no category'}
        tagColor={category.color}
        label={`${separateThousands(+price)} ₽`}
      />
    </Swipeout>
  );
});
