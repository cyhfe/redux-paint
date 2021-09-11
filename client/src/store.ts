// import { rootReducer } from "./rootReducer";
import { logger } from "redux-logger";
import historyIndex from "./modules/historyIndex/slice";
import currentStroke from "./modules/currentStroke/slice";
import strokes from "./modules/strokes/slice";

import { configureStore } from "@reduxjs/toolkit";

const reducer = {
  currentStroke,
  historyIndex,
  strokes,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});
