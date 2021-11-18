import 'styled-components';
import { ColorSchemeName } from 'react-native';
import colors from './theme/colors';
import typography from './theme/typography';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof colors.light;
    space: number[];
    typography: typeof typography;
    scheme: ColorSchemeName;
  }
}
