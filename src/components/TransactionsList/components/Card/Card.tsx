import React, { FC, memo, useState } from 'react';
import Swipeout from 'react-native-swipeout';
import { useTheme } from 'styled-components/native';

import { Transaction } from '../../../../types';

import { useUserState } from '../../../../contexts/user';
import { deleteTransaction } from '../../../../api/transactions/deleteTransaction';
import { TransactionCard } from '../../../TransactionCard';

import { separateThousands } from '../../../../utils/separateThousands';
import { useTransactionsDispatch } from '../../../../contexts/transactions';
import { useModalsDispatch } from '../../../../contexts/modals';
import { useErrorHandler } from '../../../../hooks/useErrorHandler';
import i18n from 'i18n-js';

export const Card: FC<Transaction> = memo((props) => {
  const { title, category, price, id } = props;
  const { colors: { bgPrimary, systemRed, textPrimary }} = useTheme();
  const modalsDispatch = useModalsDispatch();
  const transactionsDispatch = useTransactionsDispatch();
  const { token, currency } = useUserState();
  const [error, setError] = useState(null);

  useErrorHandler(error);

  const onDelete = async () => {
    try {
      await deleteTransaction(id, token);
      transactionsDispatch({ type: 'deleteTransaction', payload: { id }})
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Swipeout
      backgroundColor={bgPrimary}
      right={[{
        text: i18n.t('common.action.delete'),
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
        subTitle={category.title || i18n.t('transactions.emptyCategory')}
        tagColor={category.color}
        label={`${separateThousands(+price)} ${currency?.unit || ''}`}
      />
    </Swipeout>
  );
});
