import React, { FC, useState } from 'react';
import format from 'date-fns/format';
import { SwipeItem, SwipeButtonsContainer } from 'react-native-swipe-item';

import { Transaction } from '../../../../types';

import { Text, TouchableOpacity } from 'react-native';
import { TransactionModal } from '../TransactionModal/TransactionModal';
import { useAppDispatch } from '../../../../appContext';
import { deleteTransaction } from '../../../../api/transaction/deleteTransaction';
import { CardDetails } from '../../../../components/CardDetails';
import { CardButton } from '../../../../components/CardButton';

import { useTheme } from 'styled-components/native';

export const TransactionCard: FC<Transaction> = (props) => {
  const { title, category, price, date, id} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const { colors: { bgPrimary, systemRed }} = useTheme();
  const dispatch = useAppDispatch();

  const onDelete = () => {
    deleteTransaction(
      id,
      () => dispatch({ type: 'deleteTransaction', payload: { id }})
    );
  };

  const rightButton = (
    <SwipeButtonsContainer
      style={{
        aspectRatio: 1,
        height: '100%',
      }}
    >
      <TouchableOpacity
        onPress={onDelete}
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: systemRed,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: '#fff' }}>удалить</Text>
      </TouchableOpacity>
    </SwipeButtonsContainer>
  );

  return (
    <SwipeItem
      style={{
        height: 70.5,
      }}
      swipeContainerStyle={{
        backgroundColor: bgPrimary,
      }}
      rightButtons={rightButton}
      disableSwipeIfNoButton
    >
      <CardButton onPress={() => setModalVisible(true)}>
        <CardDetails
          title={title}
          subTitle={category}
          label={`${+price} руб.`}
        />
      </CardButton>
      {/*<TextVariant style={{ fontSize: 14, color: '#939393' }}>{format(new Date(date), 'dd MMM')}</TextVariant>*/}
      <TransactionModal {...props} visible={modalVisible} setVisible={setModalVisible} />
    </SwipeItem>
  );
};
