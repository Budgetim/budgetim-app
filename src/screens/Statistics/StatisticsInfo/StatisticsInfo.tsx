import React, { FC, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import format from 'date-fns/format';

import { useUserState } from '../../../contexts/user';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getStatistics } from '../../../api/category/getStatistics';
import { separateThousands } from '../../../utils/separateThousands';
import { PieChartWrapper, ChartTitle, ChartSubtitle, NavigateButton } from './styled';
import { PieChart } from '../../../components/PieChart';
import { useTheme } from 'styled-components/native';
import { TextVariant } from '../../../components/TextVariant';
import { Loader } from '../../../components/Loader';
import { CategoriesList } from '../CategoriesList';

export interface StatisticsInfoProps {
  year: number;
  month: number;
  setNextDate?: () => {};
  setPrevDate?: () => {};
}

export interface StatisticsItem {
  color: string;
  description: string;
  id: number;
  sum: string;
  title: string;
}

export const StatisticsInfo: FC<StatisticsInfoProps> = ({ month, year, setNextDate, setPrevDate }) => {
  const { token, currency } = useUserState();
  const [data, setData] = useState<StatisticsItem[]>([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const { colors: { textPrimary } } = useTheme();

  const getStatisticsInit = async () => {
    setLoading(true);
    setData([]);
    try {
      const categories = await getStatistics({ month, year }, token);
      setData(categories)
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    void getStatisticsInit();
  }, [month, year]);

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (error) {
      return <TextVariant variant="subheadlineBold">{error}</TextVariant>;
    }

    return (
      <CategoriesList data={data} month={month} year={year} />
    )
  };

  return (
    <View style={{ flex: 1 }}>
      <PieChartWrapper>
        <NavigateButton onPress={setPrevDate} disabled={!setPrevDate}>
          <MaterialIcons name="arrow-back-ios" color={textPrimary} size={24} />
        </NavigateButton>
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
          <ChartSubtitle variant="subheadlineBold">{format(new Date(year, month - 1), 'MMM yyyy')}</ChartSubtitle>
          <ChartTitle variant="bodyBold">
            {data.length > 0 ? `${separateThousands(data.reduce((sum, item) => sum + +item.sum, 0))} ${currency?.unit || ''}` : ' '}
          </ChartTitle>
        </PieChart>
        <NavigateButton onPress={setNextDate} disabled={!setNextDate}>
          <MaterialIcons name="arrow-forward-ios" color={textPrimary} size={24} />
        </NavigateButton>
      </PieChartWrapper>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollIndicatorInsets={{ right: 1 }}>
        {renderContent()}
      </ScrollView>
    </View>
  );
};
