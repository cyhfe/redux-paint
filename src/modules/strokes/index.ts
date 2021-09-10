import { RootState, Stroke } from "../../types";

export const END_STROKE = "END_STROKE";
export const RESET = "RESET";

const initialState: RootState["strokes"] = [];
type StrokesAction =
  | {
      type: typeof END_STROKE;
      payload: {
        stroke: Stroke;
        historyIndex: number;
      };
    }
  | {
      type: typeof RESET;
    };

export const reducer = (
  state: RootState["strokes"] = initialState,
  action: StrokesAction
) => {
  switch (action.type) {
    case END_STROKE: {
      const { stroke, historyIndex } = action.payload;
      if (!stroke.points.length) return state;
      // debugger
      return [...state.slice(0, state.length - historyIndex), stroke];
    }
    case RESET: {
      return initialState;
    }
    default:
      return state;
  }
};
