import React, { FC, useEffect, useState } from 'react';
import i18n from 'i18n-js';
import { Pressable, ScrollView } from 'react-native';

import { TextVariant } from '../../../../components/TextVariant';
import { LineChart } from '../../../../charts/LineChart';

import {
  ButtonText,
  Content,
  Header,
  ModalContent,
  ModalWrapper,
} from './styled';

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

  useErrorHandler(error);

  const getData = async () => {
    setLoading(true);
    try {
      const result = await getCategoryStatistics({ categoryId }, token);
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (visible) {
      void getData();
    }
  }, [visible])

  let content = null;

  if (isLoading) {
    content = <Loader />
  }

  if (data) {
    content = (
      <>
        <Header>
          <TextVariant variant="bodyRegular">{data.title}</TextVariant>
          <Pressable
            style={{ display: 'flex', flexDirection: 'row' }}
            onPress={onClose}
          >
            <ButtonText variant="subheadlineBold">{i18n.t('common.action.cancel')}</ButtonText>
          </Pressable>
        </Header>
        <ScrollView>
          <Content>
            <LineChart
              data={data.data.map(item => ({ value: item.value }))}
              categories={data.data.map(item => format(new Date(item.date), 'yyyy-MM-dd'))}
              height={250}
            />
          </Content>
        </ScrollView>
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
      <ModalContent>
        {content}
      </ModalContent>
    </ModalWrapper>
  );
}