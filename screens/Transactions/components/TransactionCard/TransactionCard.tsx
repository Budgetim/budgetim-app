import React, { FC, useState } from 'react';
import format from 'date-fns/format';

import { Transaction } from '../../../../types';

import { Card, Info } from './styled';
import { TextInput, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { useAppDispatch } from '../../../../appContext';

export const TransactionCard: FC<Transaction> = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { _id } = props;
  const [title, setTitle] = useState(props.title);
  const [price, setPrice] = useState(props.price);
  const [category, setCategory] = useState(props.category);
  const [date, setDate] = useState(props.date);
  const dispatch = useAppDispatch();

  const onDelete = async () => {
    try {
      const response = await fetch('https://api.budgetim.ru/transaction/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: _id,
        }),
      });

      if (response.ok) {
        dispatch({ type: 'deleteTransaction', payload: { id: _id }});
      }
    } catch (error) {
    } finally {
    }
  }

  const onEdit = async () => {
    try {
      const response = await fetch('https://api.budgetim.ru/transaction/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: _id,
          title,
          category,
          price,
          date,
        }),
      });
      const transaction = await response.json();
      dispatch({ type: 'editTransaction', payload: transaction});
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card onPress={() => setModalVisible(true)}>
      <Info>
        <Text style={{ fontSize: 20 }}>{title}</Text>
        <Text style={{ fontSize: 16, color: '#939393' }}>{category}</Text>
        <Text style={{ fontSize: 16, color: '#939393' }}>{format(new Date(date), 'dd MMM')}</Text>
      </Info>
      <Text style={{ fontSize: 16 }}>{price}</Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Card>
              <Info>
                <TextInput
                  defaultValue={title}
                  onChangeText={setTitle}
                  onEndEditing={onEdit}
                  style={{ fontSize: 20 }}
                />
                <TextInput
                  defaultValue={category}
                  onChangeText={setCategory}
                  onEndEditing={onEdit}
                  style={{ fontSize: 16, color: '#939393' }}
                />
                <TextInput
                  defaultValue={date}
                  onChangeText={setDate}
                  onEndEditing={onEdit}
                  style={{ fontSize: 16, color: '#939393' }}
                />
              </Info>
              <TextInput
                defaultValue={price.toString()}
                onChangeText={price => setPrice(+price)}
                onEndEditing={onEdit}
                style={{ fontSize: 16 }}
              />
            </Card>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>скрыть</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonDelete]}
              onPress={onDelete}
            >
              <Text style={styles.textStyle}>удалить</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </Card>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonDelete: {
    backgroundColor: "#c91020",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginBottom: 16,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});