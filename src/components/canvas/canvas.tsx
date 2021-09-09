import styles from "./canvas.module.css";

import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentStrokeSelector } from "../../selectors";
import { beginStroke, endStroke, updateStroke } from "../../actions";
import { drawStroke, setCanvasSize } from "../../utils/cavasUtils";

const WIDTH = 960;
const HEIGHT = 540;

const Canvas = () => {
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
  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
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
    <canvas
      className={styles.canvas}
      onMouseDown={startDrawing}
      onMouseUp={endDrawing}
      onMouseOut={endDrawing}
      onMouseMove={draw}
      ref={canvasRef}
    />
  );
};

export default Canvas;
