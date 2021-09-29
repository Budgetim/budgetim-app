import 'styled-components';
import colors from './theme/colors';
import typography from './theme/typography';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof colors.light;
    space: number[];
    typography: typeof typography;
  }
}
