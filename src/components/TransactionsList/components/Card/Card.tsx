import React, { FC, memo } from 'react';
import { Transaction } from '../../../../types';
import { deleteTransaction } from '../../../../api/transactions/deleteTransaction';
import { TransactionCard } from '../../../TransactionCard';
import { separateThousands } from '../../../../utils/separateThousands';
import { useTransactionsDispatch } from '../../../../contexts/transactions';
import { useModalsDispatch } from '../../../../contexts/modals';
import i18n from 'i18n-js';
import { SwipeableRow } from '../SwipeableRow';

export const Card: FC<Transaction> = memo(props => {
  const { title, category, currency, price, id } = props;
  const modalsDispatch = useModalsDispatch();
  const transactionsDispatch = useTransactionsDispatch();

  const onDelete = async () => {
    await deleteTransaction(id);
    transactionsDispatch({ type: 'deleteTransaction', payload: { id } });
  };

  const label =
    currency.position === 'L'
      ? `${currency.symbol} ${separateThousands(price)}`
      : `${separateThousands(price)} ${currency.symbol}`;

  return (
    <SwipeableRow onPress={onDelete}>
      <TransactionCard
        onPress={() => {
          modalsDispatch({ type: 'setModalTransactionId', payload: { id } });
          modalsDispatch({ type: 'setTransactionModalVisible', payload: { isVisible: true } });
        }}
        title={title}
        subTitle={category.title || i18n.t('transactions.emptyCategory')}
        tagColor={category.color}
        label={label}
      />
    </SwipeableRow>
  );
});
