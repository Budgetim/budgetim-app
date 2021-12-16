import styled from 'styled-components/native';
import { View, TouchableOpacity } from 'react-native';
import css from '@styled-system/css';

export const Footer = styled(View)(
  css({
    bg: 'navigationBar',
    borderColor: 'systemGray05',
    borderTopWidth: 0.5,
    height: 70,
    display: 'flex',
    flexDirection: 'row',
    // position: 'absolute',
    // width: '100%',
    // bottom: 90,
    // left: 0,
  }),
);

export const Button = styled(TouchableOpacity)(
  css({
    position: 'absolute',
    top: 0,
    width: 58,
    height: 58,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
);

export const AddButton = styled(Button)(
  css({
    left: '50%',
    transform: 'translateX(-25px)',
  }),
);

export const SettingsButton = styled(Button)(
  css({
    right: 1,
  }),
);
