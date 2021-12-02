import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import i18n from 'i18n-js';

import { SelectGroup } from '../../components/SelectGroup';
import { StackParamList } from '../types';

import { ByMonths } from './ByMonths';
import { ByCategories } from './ByCategories';

export const Statistics: FC<NativeStackScreenProps<StackParamList, 'Statistics'>> = () => {
  const [activeMode, setActiveMode] = useState(1);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 12 }}>
        <SelectGroup
          activeIndex={activeMode}
          onChangeIndex={setActiveMode}
          data={[{ title: i18n.t('statistics.categories.title') }, { title: i18n.t('statistics.months.title') }]}
        />
      </View>
      {activeMode === 0 && <ByCategories />}
      {activeMode === 1 && <ByMonths />}
    </View>
  );
};
