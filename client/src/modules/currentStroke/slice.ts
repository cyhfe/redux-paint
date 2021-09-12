import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Point, Stroke } from "../../types";
import { endStroke , reset} from "../sharedActions";

const initialState: Stroke = {
  points: [],
  color: "#000",
};

export const currentStroke = createSlice({
  name: "currentStroke",
  initialState,
  reducers: {
    startStroke(state, action: PayloadAction<Point>) {
      state.points.push(action.payload);
    },
    updateStroke(state, action: PayloadAction<Point>) {
      state.points.push(action.payload);
    },
    setColor(state, action:PayloadAction<string>) {
      state.color = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(endStroke, (state) => {
      state.points = []
    })
    builder.addCase(reset, () => {
      return initialState
    })
  }
});


export const {startStroke, updateStroke, setColor} = currentStroke.actions
export default currentStroke.reducer
