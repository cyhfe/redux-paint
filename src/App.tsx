import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentStrokeSelector } from "./selectors";
import { beginStroke, endStroke, updateStroke } from "./actions";
import { drawStroke, setCanvasSize } from "./utils/cavasUtils";
import classNames from "classnames";
import styles from "./app.module.css";
import ColorPanel from "./components/colorPanel";

const WIDTH = 960;
const HEIGHT = 540;

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentStroke = useSelector(currentStrokeSelector);
  const isDrawing = !!currentStroke.points.length;
  const dispatch = useDispatch();
  const startDrawing = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    dispatch(beginStroke(offsetX, offsetY));
  };
  const draw = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    console.log(isDrawing);
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    dispatch(updateStroke(offsetX, offsetY));
  };
  const endDrawing = () => {
    if (!isDrawing) return;
    dispatch(endStroke());
  };
  const getCanvasWithContext = (canvas = canvasRef.current) => {
    return {
      canvas,
      context: canvas?.getContext("2d"),
    };
  };
  useEffect(() => {
    const { context } = getCanvasWithContext();
    if (!context) return;
    requestAnimationFrame(() => {
      drawStroke(context, currentStroke.points, currentStroke.color);
    });
  }, [currentStroke]);
  useEffect(() => {
    const { canvas, context } = getCanvasWithContext();

    if (!canvas || !context) return;
    setCanvasSize(canvas, WIDTH, HEIGHT);
  }, []);
  return (
    <div className={classNames("window", styles.container)}>
      <div className="title-bar">
        <div className="title-bar-text">redux - piant</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>
      <div className={classNames("window-body", styles.body)}>
        <ColorPanel />
        <canvas
          className={styles.canvas}
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseOut={endDrawing}
          onMouseMove={draw}
          ref={canvasRef}
        />
      </div>
    </div>
  );
}

export default App;
