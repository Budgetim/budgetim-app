import React, { useState } from 'react';

import { Button, ScrollView } from 'react-native';
import { CategoriesList } from './components/CategoriesList';
import { CategoryModal } from './components/CategoryModal';

export const Categories = ({ navigation }: any) => {
  const [modalVisible, setModalVisible] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setModalVisible(true)} title="добавить" />
      ),
    });
  }, [navigation]);

  return (
    <ScrollView>
      <CategoriesList />
      <CategoryModal category={{ title: '', description: '', color: '' }} visible={modalVisible} setVisible={setModalVisible} />
    </ScrollView>
  );
};
