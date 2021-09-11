import { RootState, Point, Stroke } from "../../types";
import { RESET } from "../actions";

export const BEGIN_STROKE = "BEGIN_STROKE";
export const UPDATE_STROKE = "UPDATE_STROKE";
export const SET_STROKE_COLOR = "SET_STROKE_COLOR";
export const END_STROKE = "END_STROKE";

type CurrentStrokeAction =
  | {
      type: typeof BEGIN_STROKE;
      payload: Point;
    }
  | {
      type: typeof UPDATE_STROKE;
      payload: Point;
    }
  | {
      type: typeof END_STROKE;
      payload: {
        stroke: Stroke;
        limit: number;
      };
    }
  | {
      type: typeof SET_STROKE_COLOR;
      payload: string;
    }
  | {
      type: typeof RESET;
    };

const initialState: RootState["currentStroke"] = {
  points: [],
  color: "#000",
};

export const reducer = (
  state: RootState["currentStroke"] = initialState,
  action: CurrentStrokeAction
) => {
  switch (action.type) {
    case BEGIN_STROKE:
      return {
        ...state,
        points: [action.payload],
      };
    case UPDATE_STROKE:
      return {
        ...state,
        points: [...state.points, action.payload],
      };
    case END_STROKE: {
      return {
        ...state,
        points: [],
      };
    }
    case SET_STROKE_COLOR: {
      return {
        ...state,
        color: action.payload,
      };
    }
    case RESET: {
      return { ...initialState };
    }
    default: {
      return state;
    }
  }
};
