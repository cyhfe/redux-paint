import classNames from "classnames";
import styles from "./windowBody.module.css";
import ColorPanel from "../colorPanel/colorPanel";
import { useState } from "react";
import { useDrop, XYCoord } from "react-dnd";
import { ItemTypes } from "../../ItemTypes";
import Canvas from "../canvas/canvas";
type Offset = {
  x: number;
  y: number;
};

type DragItem = {
  top: number;
  left: number;
};

const WindowBody = () => {
  const [colorOffset, setColorOffset] = useState<Offset>({
    x: 40,
    y: 40,
  });
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
      <Canvas />
    </div>
  );
};

export default WindowBody;
