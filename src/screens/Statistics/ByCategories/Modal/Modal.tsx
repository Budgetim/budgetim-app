import i18n from 'i18n-js';
import React, { FC, useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from 'styled-components/native';

import { LineChart } from '../../../../charts/LineChart';

import { Content, Title, Titles, Description, Header, ModalContent, ModalWrapper, CloseButton } from './styled';

import { useUserState } from '../../../../contexts/user';
import { useErrorHandler } from '../../../../hooks/useErrorHandler';
import { Loader } from '../../../../components/Loader';

import { ModalProps } from './types';
import { getCategoryStatistics } from '../../../../api/categories/getCategoryStatistics';
import format from 'date-fns/format';

export const Modal: FC<ModalProps> = ({ visible, categoryId, onClose }) => {
  const { token } = useUserState();
  const [data, setData] = useState<{ title: string; description: string; data: any[] } | null>(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const {
    colors: { textSecondary },
  } = useTheme();

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
            {data.description && <Description variant="bodyRegular">{data.description}</Description>}
          </Titles>
          <CloseButton onPress={onClose}>
            <AntDesign name="closecircle" color={textSecondary} size={28} />
          </CloseButton>
        </Header>
        <Content>
          <LineChart
            data={data.data.map(item => ({ value: item.value }))}
            categories={data.data.map(item => format(new Date(item.date), 'yyyy-MM-dd'))}
            height={245}
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
