import styled from 'styled-components/native'
import { Text, TouchableOpacity, View } from 'react-native';

export const Header = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
`;

export const Content = styled(View)`
  padding: 16px;
`;

export const Section = styled(View)`
  border-radius: 12px;
  background: #fff;
  padding: 16px;
  margin-bottom: 16px;
`;

export const ModalWrapper = styled(View)`
  flex: 1;
  justify-content: flex-end;
  display: flex;
`;

export const ModalContent = styled(View)`
  background-color: #f3f2f7;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  max-height: 70%;
`;

export const ButtonText = styled(Text)`
  color: #2196F3;
  font-size: 16px;
`;

export const CategoryWrapper = styled(TouchableOpacity)<{ hasBorder: boolean }>`
  padding: 16px 0;
  ${({ hasBorder }) => hasBorder && `
    border-color: #E5E5E5;
    border-bottom-width: 1px;
  `}
`;

export const Categories = styled(View)`
  margin: -16px 0;
`;

export const Category = styled(Text)<{ isSelected: boolean }>`
  ${({ isSelected }) => isSelected && 'font-weight: bold'}
  border-color: #E5E5E5;
  border-bottom-width: 1px;
  font-size: 16px;
`;