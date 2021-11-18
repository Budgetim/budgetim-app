import React, { FC, useCallback, useState } from 'react';
import i18n from 'i18n-js';
import { Pressable, ScrollView, View } from 'react-native';

import { CategoryCard } from '../../../components/CategoryCard';
import { MicroChart } from '../../../charts/MicroChart';
import { TextVariant } from '../../../components/TextVariant';
import { LineChart } from '../../../charts/LineChart';

import {
  Container,
  ButtonText,
  Content,
  Header,
  ModalContent,
  ModalWrapper,
} from './styled';

export const ByCategories: FC = () => {
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);

  const onClose = () => {
    setVisible(false);
  };

  const getRandom = useCallback(() => {
    const arr = [];
    for (let i = 0; i < 25; i++) {
      arr.push(Math.round(Math.random() * 9));
    }
    return arr;
  }, []);

  return (
    <Container>
      {new Array(15).fill(0).map((item, index) => {
        return (
          <CategoryCard
            key={index}
            title="Category name"
            description="Description"
            tagColor="pink"
            chart={<MicroChart data={getRandom()} />}
            onPress={() => setVisible(true)}
          />
        )
      })}
      <ModalWrapper
        isVisible={visible}
        onBackdropPress={onClose}
        onSwipeComplete={onClose}
        swipeDirection="down"
        avoidKeyboard
        propagateSwipe
      >
        <ModalContent>
          <Header>
            <View />
            <TextVariant variant="bodyRegular">Category name</TextVariant>
            <Pressable
              style={{ display: 'flex', flexDirection: 'row' }}
              onPress={onClose}
            >
              <ButtonText variant="subheadlineBold">{i18n.t('common.action.cancel')}</ButtonText>
            </Pressable>
          </Header>
          <ScrollView>
            <Content onLayout={(event) => setWidth(event.nativeEvent.layout.width)}>
              {!!width && (
                <LineChart
                  data={[5, 4, 5, 2, 5, 4, 3, 8, 2, 0, 10, 5, 3, 5, 2].map(value => ({ value }))}
                  categories={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']}
                  height={220}
                  width={width}
                />
              )}
            </Content>
          </ScrollView>
        </ModalContent>
      </ModalWrapper>
    </Container>
  );
}