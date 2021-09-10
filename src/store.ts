// import { rootReducer } from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { logger } from "redux-logger";
import { reducer as currentStroke } from "./modules/currentStroke";
import { reducer as historyIndex } from "./modules/historyIndex";
import { reducer as strokes } from "./modules/strokes";
const rootReducer = combineReducers({
  currentStroke,
  historyIndex,
  strokes,
});
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger))
);
