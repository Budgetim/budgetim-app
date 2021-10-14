import React, { FC, useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackParamList } from '../types';
import { useUser } from '../../appContext';

import { getStatistics } from '../../api/category/getStatistics';
import { CardDetails } from '../../components/CardDetails';
import { separateThousands } from '../../utils/separateThousands';
import { CardButton } from '../../components/CardButton';
import { Item, ItemButton, Wrapper, PieChartWrapper, ChartTitle, ChartSubtitle } from './styled';
import { PieChart } from '../../components/PieChart';

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
    { month: 9, year: 2021, title: 'September' },
    { month: 10, year: 2021, title: 'October' },
    { month: 11, year: 2021, title: 'November' },
  ];

  const [indexDate, setIndexDate] = useState(1);

  useEffect(() => {
    getStatistics(DATES[indexDate], (res) => {
      setData(res);
    }, () => {
    }, token);
  }, [indexDate]);

  return (
    <ScrollView>
      <Wrapper>
        {DATES.map((item, index) => {
          return (
            <ItemButton active={index === indexDate} key={item.title} onPress={() => setIndexDate(index)}>
              <Item variant="subheadlineBold">{item.title}</Item>
            </ItemButton>
          );
        })}
      </Wrapper>
      {data.length > 0 && (
        <PieChartWrapper>
          <PieChart
            data={data.map(item => {
              return {
                color: item.color,
                value: +item.sum,
                additionalValue: 1,
              };
            })}
            innerRadius={66}
            segmentWidth={6}
            outerSegmentWidth={24}
          >
            <ChartSubtitle variant="subheadlineBold">{DATES[indexDate].title}</ChartSubtitle>
            <ChartTitle variant="bodyBold">{separateThousands(data.reduce((sum, item) => sum + +item.sum, 0))} ₽</ChartTitle>
          </PieChart>
        </PieChartWrapper>
      )}
      <View>
        {data.map(item => {
          return (
            <CardButton key={item.id}>
              <CardDetails
                title={item.title}
                subTitle={item.description}
                label={`${separateThousands(+item.sum)} ₽`}
                tagColor={item.color}
              />
            </CardButton>
          );
        })}
      </View>
    </ScrollView>
  );
};
