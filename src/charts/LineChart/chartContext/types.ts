import { XScale, YScale } from '../types';
import { LineChartProps } from '../LineChart';

export interface ChangeXPositionAction {
  type: 'changeXPosition';
  payload: { x?: number };
}

export type ChartDispatchAction = ChangeXPositionAction;

export type ChartDispatch = (action: ChartDispatchAction) => void;

/* пропсы графика, которые пойдут в состояние контекста */
type LineChartNextProps = 'data' | 'categories' | 'height';

export interface ChartContextState extends Pick<LineChartProps, LineChartNextProps> {
  activeIndex: number | undefined;
  xPosition: number | undefined;
  xScale: XScale;
  yScale: YScale;
  colWidth: number;
}
