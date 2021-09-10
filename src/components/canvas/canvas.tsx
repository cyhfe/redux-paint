import styles from "./canvas.module.css";

import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  currentStrokeSelector,
  historyIndexSelector,
  strokesSelector,
} from "../../modules/selectors";
import { beginStroke, endStroke, updateStroke } from "../../modules/actions";
import {
  clearCanvas,
  drawStroke,
  setCanvasSize,
} from "../../utils/cavasUtils";
import { useCanvas } from "../../canvasContext";

const WIDTH = 960;
const HEIGHT = 540;

const Canvas = () => {
  const canvasRef = useCanvas();
  const currentStroke = useSelector(currentStrokeSelector);
  const historyIndex = useSelector(historyIndexSelector);
  const strokes = useSelector(strokesSelector);

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
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    dispatch(updateStroke(offsetX, offsetY));
  };

  const endDrawing = () => {
    if (!isDrawing) return;
    console.log(currentStroke, historyIndex)
    // debugger
    dispatch(endStroke(currentStroke, historyIndex));
  };

  const getCanvasWithContext = useCallback(
    (canvas = canvasRef.current) => {
      return {
        canvas,
        context: canvas?.getContext("2d"),
      };
    },
    [canvasRef]
  );

  // 初始化canvas
  useEffect(() => {
    const { canvas, context } = getCanvasWithContext();
    if (!canvas || !context) return;
    setCanvasSize(canvas, WIDTH, HEIGHT);
    context.lineJoin = "round";
    context.lineCap = "round";
    context.lineWidth = 5;
    clearCanvas(canvas, context);
  }, [getCanvasWithContext]);

  // 绘制当前笔画
  useEffect(() => {
    const { context } = getCanvasWithContext();
    if (!context) return;
    requestAnimationFrame(() => {
      drawStroke(context, currentStroke.points, currentStroke.color);
    });
  }, [currentStroke, getCanvasWithContext]);

  // 历史记录变化后清空画布重新绘制
  useEffect(() => {
    const { canvas, context } = getCanvasWithContext();
    if (!context || !canvas) {
      return;
    }
    requestAnimationFrame(() => {
      clearCanvas(canvas, context);
      strokes
        .slice(0, strokes.length - historyIndex)
        .forEach((stroke) => {
          drawStroke(context, stroke.points, stroke.color);
        });
    });
  }, [strokes, historyIndex, getCanvasWithContext]);

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
