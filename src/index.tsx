import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CanvasProvider } from "./canvasContext";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <CanvasProvider>
          <App />
        </CanvasProvider>
      </DndProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
