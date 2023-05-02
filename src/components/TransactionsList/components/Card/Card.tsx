import React, { FC, memo } from 'react';
import { Transaction } from '../../../../types';
import { deleteTransaction } from '../../../../api/transactions/deleteTransaction';
import { TransactionCard } from '../../../TransactionCard';
import { separateThousands } from '../../../../utils/separateThousands';
import { useModalsDispatch } from '../../../../contexts/modals';
import i18n from 'i18n-js';
import { SwipeableRow } from '../SwipeableRow';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../../../App';

export const Card: FC<Transaction> = memo(props => {
  const { title, category, currency, price, id } = props;
  const modalsDispatch = useModalsDispatch();

  const mutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });

  const onDelete = async () => {
    mutation.mutate(id);
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
