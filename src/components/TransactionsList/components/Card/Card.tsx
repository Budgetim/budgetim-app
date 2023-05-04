import React, { FC, memo } from 'react';
import { Transaction } from '../../../../types';
import { TransactionCard } from '../../../TransactionCard';
import { separateThousands } from '../../../../utils/separateThousands';
import { useModalsDispatch } from '../../../../contexts/modals';
import i18n from 'i18n-js';
import { SwipeableRow } from '../SwipeableRow';
import { useDeleteTransaction } from '../../../../hooks/transactions';

export const Card: FC<Transaction> = memo(props => {
  const { title, category, currency, price, id } = props;
  const modalsDispatch = useModalsDispatch();
  const deleteTransaction = useDeleteTransaction();

  const onDelete = async () => {
    deleteTransaction(id);
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
