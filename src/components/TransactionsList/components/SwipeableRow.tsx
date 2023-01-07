import React, { FC, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import i18n from 'i18n-js';
import { useTheme } from 'styled-components/native';

const styles = StyleSheet.create({
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

type SwipeableRow = {
  onPress: () => void;
};

export const SwipeableRow: FC<SwipeableRow> = ({ children, onPress }) => {
  const {
    colors: { systemRed },
  } = useTheme();

  const swipeableRow = useRef<Swipeable>();

  const close = () => {
    swipeableRow?.current?.close();
  };

  const renderRightAction = (text: string, color: string, x: number, progress: Animated.AnimatedInterpolation) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = () => {
      close();
      onPress();
    };

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton style={[styles.rightAction, { backgroundColor: color }]} onPress={pressHandler}>
          <Text style={styles.actionText}>{text}</Text>
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
    <Swipeable
      ref={swipeableRow}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={renderRightActions}
    >
      {children}
    </Swipeable>
  );
};
