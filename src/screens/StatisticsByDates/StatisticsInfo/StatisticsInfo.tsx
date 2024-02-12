import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';
import format from 'date-fns/format';
import { ErrorMessage } from '../../../components/ErrorMessage';
import { ArrowLeftIcon } from '../../../icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../../../icons/ArrowRightIcon';
import { getLocale } from '../../../utils/getLocale';
import { separateThousands } from '../../../utils/separateThousands';
import { PieChartWrapper, ChartTitle, ChartSubtitle, NavigateButton } from './styled';
import { PieChart } from '../../../components/PieChart';
import { useTheme } from 'styled-components/native';
import { Loader } from '../../../components/Loader';
import { CategoriesList } from '../CategoriesList';
import { useGetCurrencies } from '../../../hooks/currencies';
import { useGetStatistics } from '../../../hooks/categories';

export interface StatisticsInfoProps {
  year: number;
  month: number;
  currencyId: number;
  setNextDate?: () => void;
  setPrevDate?: () => void;
}

export const StatisticsInfo: FC<StatisticsInfoProps> = ({ month, year, currencyId, setNextDate, setPrevDate }) => {
  const locale = getLocale();
  const { data: currencies } = useGetCurrencies();
  const { data, isLoading, error } = useGetStatistics({ month, year, currencyId });

  const {
    colors: { textPrimary },
  } = useTheme();

  const currencySymbol = currencies?.find(currency => currency.id === currencyId)!.symbol;

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (error) {
      return <ErrorMessage>{error}</ErrorMessage>;
    }

    return <CategoriesList data={data} month={month} year={year} currencySymbol={currencySymbol} />;
  };

  if (!data) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <PieChartWrapper>
        <NavigateButton onPress={setPrevDate} disabled={!setPrevDate}>
          <ArrowLeftIcon color={textPrimary} size={24} />
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
          <ChartSubtitle variant="subheadlineBold">
            {format(new Date(year, month - 1), 'LLLL yyyy', { locale })}
          </ChartSubtitle>
          <ChartTitle variant="bodyBold">
            {data.length > 0
              ? `${separateThousands(data.reduce((sum, item) => sum + +item.sum, 0))} ${currencySymbol}`
              : ' '}
          </ChartTitle>
        </PieChart>
        <NavigateButton onPress={setNextDate} disabled={!setNextDate}>
          <ArrowRightIcon color={textPrimary} size={24} />
        </NavigateButton>
      </PieChartWrapper>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollIndicatorInsets={{ right: 1 }}>
        {renderContent()}
      </ScrollView>
    </View>
  );
};
