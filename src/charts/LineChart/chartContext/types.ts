import { XScale, YScale } from '../types';
import { LineChartProps } from '../LineChart';

export interface ChangeXPositionAction {
  type: 'changeXPosition';
  payload: { x?: number };
}

export interface UpdateInitialArgAction {
  type: 'updateInitialArg';
  payload: { args: ChartContextState };
}

export type ChartDispatchAction = ChangeXPositionAction | UpdateInitialArgAction;

export type ChartDispatch = (action: ChartDispatchAction) => void;

/* пропсы графика, которые пойдут в состояние контекста */
type LineChartNextProps = 'data' | 'categories' | 'height';

export interface ChartContextState extends Pick<LineChartProps, LineChartNextProps> {
  activeIndex: number | undefined;
  xScale: XScale;
  yScale: YScale;
  width: number;
  ticks: number[];
  monthsList: {
    month: number;
    year: number,
    days: string[]
  }[];
}
