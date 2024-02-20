import React, { FC, memo } from 'react';
import { Transaction } from '../../../../types';
import { TransactionCard } from '../../../TransactionCard';
import { separateThousands } from '../../../../utils/separateThousands';
import { useModalsDispatch } from '../../../../contexts/modals';
import { SwipeableRow } from '../SwipeableRow';
import { useDeleteTransaction } from '../../../../hooks/transactions';
import { useTheme } from 'styled-components/native';
import { getCategoryTitle } from '../../../../utils/getCategoryTitle';

export const Card: FC<Transaction> = memo(props => {
  const { title, category, currency, price, id } = props;
  const {
    colors: { systemGray02 },
  } = useTheme();
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
          modalsDispatch({ type: 'setTransactionModal', payload: { id } });
        }}
        title={title}
        subTitle={getCategoryTitle(category?.title ?? null)}
        tagColor={category?.color || systemGray02}
        label={label}
      />
    </SwipeableRow>
  );
});
