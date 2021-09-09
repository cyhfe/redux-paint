import classNames from "classnames";
import styles from "./windowBody.module.css";
import ColorPanel from "../colorPanel/colorPanel";
import { useDrop, XYCoord } from "react-dnd";
import { ItemTypes } from "../../ItemTypes";
import { useState } from "react";
import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentStrokeSelector } from "../../selectors";
import { beginStroke, endStroke, updateStroke } from "../../actions";
import { drawStroke, setCanvasSize } from "../../utils/cavasUtils";

const WindowBody = () => {
  const WIDTH = 960;
  const HEIGHT = 540;

  type DragItem = {
    top: number;
    left: number;
  };
  const [colorOffset, setColorOffset] = useState<{
    x: number;
    y: number;
  }>({
    x: 40,
    y: 40,
  });
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

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.COLOR_PANEL,
    drop(item: DragItem, monitor) {
      if (!monitor.getDifferenceFromInitialOffset()) return;
      const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
      const x = Math.round(item.left + delta.x);
      const y = Math.round(item.top + delta.y);
      setColorOffset({ x, y });
      console.log(monitor.getDifferenceFromInitialOffset(), item);
    },
  }));
  return (
    <div className={classNames("window-body", styles.body)} ref={drop}>
      <ColorPanel top={colorOffset.y} left={colorOffset.x} />
      <canvas
        className={styles.canvas}
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </div>
  );
};

export default WindowBody;
