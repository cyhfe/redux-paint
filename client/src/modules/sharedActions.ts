import { createAction } from "@reduxjs/toolkit";
import { Stroke } from "../types";

export const endStroke = createAction<{
  currentStroke: Stroke;
  historyIndex: number;
}>("endStroke");

export const reset = createAction("reset");

export const setStrokes = createAction<Stroke[]>('setStrokes')
