import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { endStroke, reset } from "../sharedActions";

const initialState = 0;

export const historyIndex = createSlice({
  name: "historyIndex",
  initialState,
  reducers: {
    undo(state, action: PayloadAction<number>) {
      return Math.min(state + 1, action.payload);
    },
    redo(state) {
      return Math.max(state - 1, 0);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(endStroke, (state) => {
      return 0;
    });
    builder.addCase(reset, () => {
      return initialState;
    });
  },
});

export const { undo, redo } = historyIndex.actions;

export default historyIndex.reducer;
