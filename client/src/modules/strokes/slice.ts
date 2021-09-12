import { createSlice } from "@reduxjs/toolkit";
import { Stroke } from "../../types";
import { endStroke, reset, setStrokes } from "../sharedActions";

const initialState: Stroke[] = [];

export const strokes = createSlice({
  name: "strokes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(endStroke, (state, action) => {
      if (action.payload.historyIndex === 0) {
        state.push(action.payload.currentStroke);
        return;
      }
      state.splice(
        -action.payload.historyIndex,
        action.payload.historyIndex,
        action.payload.currentStroke
      );
    });
    builder.addCase(reset, () => {
      return initialState;
    });
    builder.addCase(setStrokes, (state, action) => {
      return action.payload;
    });
  },
});

export default strokes.reducer;
