import i18n from 'i18n-js';
import React, { FC, useEffect, useState } from 'react';

import { LineChart } from '../../../charts/LineChart';
import { CloseIcon } from '../../../icons/CloseIcon';

import { Content, Title, Titles, Description, Header, ModalContent, ModalWrapper, CloseButton } from './styled';

import { useUserState } from '../../../contexts/user';
import { useErrorHandler } from '../../../hooks/useErrorHandler';
import { Loader } from '../../../components/Loader';

import { ModalProps } from './types';
import { getCategoryStatistics } from '../../../api/categories/getCategoryStatistics';
import format from 'date-fns/format';

export const Modal: FC<ModalProps> = ({ visible, categoryId, onClose }) => {
  const { token } = useUserState();
  const [activeModeIndex, setActiveModeIndex] = useState(0);
  const [data, setData] = useState<{ title: string; description: string; data: any[] } | null>(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const modes = [
    { title: i18n.t('statistics.categories.period.7d'), count: 7 },
    { title: i18n.t('statistics.categories.period.2w'), count: 14 },
    { title: i18n.t('statistics.categories.period.4w'), count: 28 },
    { title: i18n.t('statistics.categories.period.8w'), count: 56 },
    { title: i18n.t('statistics.categories.period.12w'), count: 94 },
  ];

  useErrorHandler(error);

  const getData = async () => {
    setLoading(true);
    try {
      const result = await getCategoryStatistics({ categoryId }, token);
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible) {
      void getData();
    } else {
      setData(null);
      setLoading(true);
    }
  }, [visible]);

  let content = null;

  if (isLoading) {
    content = <Loader />;
  }

  if (data) {
    content = (
      <>
        <Header>
          <Titles>
            <Title variant="title2Bold">{data.title || i18n.t('transactions.emptyCategory')}</Title>
            {data.description ? <Description variant="bodyRegular">{data.description}</Description> : null}
          </Titles>
          <CloseButton onPress={onClose}>
            <CloseIcon />
          </CloseButton>
        </Header>
        <Content>
          <LineChart
            data={data.data.slice(-modes[activeModeIndex].count).map(item => ({ value: +item.value }))}
            categories={data.data
              .slice(-modes[activeModeIndex].count)
              .map(item => format(new Date(item.date), 'yyyy-MM-dd'))}
            height={245}
            modes={modes}
            activeModeIndex={activeModeIndex}
            setActiveModeIndex={setActiveModeIndex}
          />
        </Content>
      </>
    );
  }

  return (
    <ModalWrapper
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      avoidKeyboard
      propagateSwipe
    >
      <ModalContent>{content}</ModalContent>
    </ModalWrapper>
  );
};
