import { Point ,Stroke} from "../types";
export const BEGIN_STROKE = "BEGIN_STROKE";
export const END_STROKE = "END_STROKE";
export const UPDATE_STROKE = "UPDATE_STROKE";
export const SET_STROKE_COLOR = "SET_STROKE_COLOR";
export const UNDO = "UNDO";
export const REDO = "REDO";
export const RESET = "RESET";

export type Action =
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
    }
  | {
      type: typeof SET_STROKE_COLOR;
      payload: string;
    }
  | {
      type: typeof REDO;
    }
  | {
      type: typeof UNDO;
    }
  | {
      type: typeof RESET;
    };

export const beginStroke = (x: number, y: number) => {
  return {
    type: BEGIN_STROKE,
    payload: {
      x,
      y,
    },
  };
};

export const endStroke = (stroke: Stroke, historyIndex: number) => {
  return {
    type: END_STROKE,
    payload: {
      stroke,
      historyIndex
    }
  };
};

export const updateStroke = (x: number, y: number) => {
  return {
    type: UPDATE_STROKE,
    payload: {
      x,
      y,
    },
  };
};

export const setColor = (color: string) => {
  return {
    type: SET_STROKE_COLOR,
    payload: color,
  };
};

export const undo = (strokesLength: number) => {
  return {
    type: UNDO,
    payload: strokesLength,
  };
};

export const redo = () => {
  return {
    type: REDO,
  };
};

export const reset = () => {
  return {
    type: RESET,
  };
};
