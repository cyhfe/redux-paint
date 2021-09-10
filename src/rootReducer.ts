import { RootState } from "./types";
import {
  Action,
  BEGIN_STROKE,
  END_STROKE,
  SET_STROKE_COLOR,
  REDO,
  UNDO,
  UPDATE_STROKE,
  RESET,
} from "./modules/actions";

const initialState: RootState = {
  currentStroke: {
    points: [],
    color: "#000",
  },
  strokes: [],
  historyIndex: 0,
};

export const rootReducer = (
  state: RootState = initialState,
  action: Action
) => {
  switch (action.type) {
    case BEGIN_STROKE:
      return {
        ...state,
        currentStroke: {
          ...state.currentStroke,
          points: [action.payload],
        },
      };
    case UPDATE_STROKE:
      return {
        ...state,
        currentStroke: {
          ...state.currentStroke,
          points: [...state.currentStroke.points, action.payload],
        },
      };
    case END_STROKE: {
      if (!state.currentStroke.points.length) return state;
      const historyLimit = state.strokes.length - state.historyIndex;
      return {
        ...state,
        currentStroke: {
          ...state.currentStroke,
          points: [],
        },
        strokes: [
          ...state.strokes.slice(0, historyLimit),
          state.currentStroke,
        ],
        historyIndex: 0,
      };
    }
    case SET_STROKE_COLOR:
      return {
        ...state,
        currentStroke: {
          ...state.currentStroke,
          color: action.payload,
        },
      };
    case UNDO:
      const historyIndex = Math.min(
        state.historyIndex + 1,
        state.strokes.length
      );
      return {
        ...state,
        historyIndex,
      };
    case REDO:
      return {
        ...state,
        historyIndex: Math.max(state.historyIndex - 1, 0),
      };
    case RESET: {
      return {
        ...initialState
      }
    }
    default:
      return state;
  }
};
