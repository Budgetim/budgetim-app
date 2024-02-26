import { DataItem } from '../../types';
import React, { FC } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import i18n from 'i18n-js';
import { ContentWrapper, InnerItem, LeftContent, Line, MainContent, SubTitle, Title, RightText } from './styled';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { TextVariant } from '../../../TextVariant';
import { useTheme } from 'styled-components/native';
import { ArrowRightIcon } from '../../../../icons/ArrowRightIcon';

const styles = StyleSheet.create({
  actionText: {
    color: 'white',
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export const MixedListItem: FC<DataItem & { isLast: boolean }> = ({
  onPress,
  leftContent,
  rightText,
  title,
  titleColor,
  onDelete,
  subtitle,
  isLast,
  rightContent,
  hasArrow,
}) => {
  const {
    colors: { systemRed, textSecondary },
  } = useTheme();

  const renderContent = () => {
    return (
      <InnerItem onPress={() => onPress?.()} disabled={!onPress}>
        {leftContent ? <LeftContent>{leftContent}</LeftContent> : null}
        <MainContent>
          <ContentWrapper>
            <Title variant="subheadlineRegular" numberOfLines={1} color={titleColor}>
              {title || i18n.t('transactions.emptyTitle')}
            </Title>
            {!!subtitle && (
              <SubTitle variant="subheadlineRegular" numberOfLines={1}>
                {subtitle}
              </SubTitle>
            )}
          </ContentWrapper>
          {!!rightText && <RightText variant="bodyRegular">{rightText}</RightText>}
          {!!rightContent && rightContent}
          {!!hasArrow && <ArrowRightIcon color={textSecondary} size={14} style={{ marginLeft: 8 }} />}
        </MainContent>
      </InnerItem>
    );
  };

  if (onDelete) {
    const renderRightAction = (text: string, color: string, x: number, progress: Animated.AnimatedInterpolation) => {
      const trans = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [x, 0],
      });
      const pressHandler = () => {
        //close();
        onDelete?.();
      };

      return (
        <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
          <RectButton style={[styles.rightAction, { backgroundColor: color }]} onPress={pressHandler}>
            <TextVariant variant="bodyRegular" style={styles.actionText}>
              {text}
            </TextVariant>
          </RectButton>
        </Animated.View>
      );
    };

    const renderRightActions = (
      progress: Animated.AnimatedInterpolation,
      _dragAnimatedValue: Animated.AnimatedInterpolation,
    ) => (
      <View
        style={{
          width: 84,
          flexDirection: 'row',
        }}
      >
        {renderRightAction(i18n.t('common.action.delete'), systemRed, 84, progress)}
      </View>
    );

    return (
      <>
        <Swipeable
          renderRightActions={renderRightActions}
          friction={2}
          enableTrackpadTwoFingerGesture
          rightThreshold={40}
        >
          {renderContent()}
        </Swipeable>
        {!isLast && <Line hasLeftContent={!!leftContent} />}
      </>
    );
  }

  return (
    <>
      {renderContent()}
      {!isLast && <Line hasLeftContent={!!leftContent} />}
    </>
  );
};
