import { RootState } from "../types";
export const currentStrokeSelector = (state: RootState) => state.currentStroke;
export const historyIndexSelector = (state: RootState) => state.historyIndex;
export const strokesSelector = (state: RootState) => state.strokes;
export const modalVisibleSelector = (state: RootState) => state.modalVisible;
