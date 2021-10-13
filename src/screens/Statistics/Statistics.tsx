import React, { FC, useEffect, useState } from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackParamList } from '../types';
import { useAppDispatch, useUser } from '../../appContext';

import { getStatistics } from '../../api/category/getStatistics';
import { CardDetails } from '../../components/CardDetails';
import { separateThousands } from '../../utils/separateThousands';
import { CardButton } from '../../components/CardButton';
import { Item, ItemButton, Wrapper } from './styled';

interface StatisticsItem {
  color: string;
  description: string;
  id: number;
  sum: string;
  title: string;
}

export const Statistics: FC<NativeStackScreenProps<StackParamList, 'Statistics'>> = ({ navigation}) => {
  const {token} = useUser();
  const [data, setData] = useState<StatisticsItem[]>([]);
  const DATES = [
    { month: 9, year: 2021, title: 'Сентябрь' },
    { month: 10, year: 2021, title: 'Октябрь' },
    { month: 11, year: 2021, title: 'Ноябрь' },
  ];

  const [indexDate, setIndexDate] = useState(1);

  useEffect(() => {
    getStatistics(DATES[indexDate], (res) => {
      setData(res);
    }, () => {
    }, token);
  }, [indexDate]);

  return (
    <View>
      <Wrapper>
        {DATES.map((item, index) => {
          return (
            <ItemButton active={index === indexDate} key={item.title} onPress={() => setIndexDate(index)}>
              <Item variant="subheadlineBold">{item.title}</Item>
            </ItemButton>
          );
        })}
      </Wrapper>
      <View>
        {data.map(item => {
          return (
            <CardButton key={item.id}>
              <CardDetails
                title={item.title}
                subTitle={item.description}
                label={separateThousands(+item.sum)}
                tagColor={item.color}
              />
            </CardButton>
          );
        })}
      </View>
    </View>
  );
};
