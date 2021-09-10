import classNames from "classnames";
import styles from "./windowBody.module.css";
import ColorPanel from "../colorPanel/colorPanel";
import EditPanel from "../editPanel/editPanel";
import { useState } from "react";
import { useDrop, XYCoord } from "react-dnd";
import { ItemTypes } from "../../ItemTypes";
import Canvas from "../canvas/canvas";
type Offset = {
  x: number;
  y: number;
};

type DragItem = {
  type: string;
  top: number;
  left: number;
};

const WindowBody = () => {
  const [colorOffset, setColorOffset] = useState<Offset>({
    x: 40,
    y: 40,
  });
  const [editOffset, setEditOffset] = useState<Offset>({
    x: 40,
    y: 60,
  });
  const [, drop] = useDrop(() => ({
    accept: [ItemTypes.COLOR_PANEL, ItemTypes.EDIT_PANEL],
    drop(item: DragItem, monitor) {
      if (!monitor.getDifferenceFromInitialOffset()) return;
      const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
      const x = Math.round(item.left + delta.x);
      const y = Math.round(item.top + delta.y);
      if(item.type === ItemTypes.COLOR_PANEL){
        setColorOffset({ x, y });
      } else if(item.type === ItemTypes.EDIT_PANEL) {
        setEditOffset({x, y})
      }
    },
  }));
  return (
    <div className={classNames("window-body", styles.body)} ref={drop}>
      <ColorPanel top={colorOffset.y} left={colorOffset.x} />
      <EditPanel top={editOffset.y} left={editOffset.x} />
      <Canvas />
    </div>
  );
};

export default WindowBody;
