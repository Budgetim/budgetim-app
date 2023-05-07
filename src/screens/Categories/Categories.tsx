import React, { FC } from 'react';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PlusIcon } from '../../icons/PlusIcon';

import { StackParamList } from '../types';

import { CategoriesList } from './components/CategoriesList';
import { useModalsDispatch } from '../../contexts/modals';
import { CategoryModal } from '../../modals/CategoryModal';
export const Categories: FC<NativeStackScreenProps<StackParamList, 'Categories'>> = ({ navigation }) => {
  const {
    colors: { systemBlue },
  } = useTheme();
  const modalDispatch = useModalsDispatch();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => modalDispatch({ type: 'setCategoryModal', payload: undefined })}
          style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 4, paddingBottom: 4 }}
        >
          <PlusIcon color={systemBlue} size={24} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={{ flex: 1, paddingBottom: 40 }}>
      <CategoriesList />
      <CategoryModal />
    </ScrollView>
  );
};
