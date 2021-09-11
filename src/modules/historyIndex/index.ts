import { RootState, Stroke } from "../../types";

export const UNDO = "UNDO";
export const REDO = "REDO";
export const END_STROKE = "END_STROKE";
export const RESET = "RESET";

type HistoryIndexAction =
  | {
      type: typeof REDO;
    }
  | {
      type: typeof UNDO;
      payload: number;
    }
  | {
      type: typeof END_STROKE;
      payload: {
        stroke: Stroke;
        limit: number;
      };
    }
  | {
      type: typeof RESET;
    };

const initialState = 0;
export const reducer = (
  state: RootState["historyIndex"] = initialState,
  action: HistoryIndexAction
) => {
  switch (action.type) {
    case UNDO: {
      const historyIndex = Math.min(state + 1, action.payload);
      return historyIndex;
    }
    case REDO: {
      return Math.max(state - 1, 0);
    }
    case END_STROKE: {
      return 0;
    }
    case RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

