import "./editPanel.css";
import { useState } from "react";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { setColor } from "../../actions";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../ItemTypes";

type Props = {
  top: number;
  left: number;
};

const EditPanel = ({ top, left }: Props) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.EDIT_PANEL,
      item: {
        type: ItemTypes.EDIT_PANEL,
        top,
        left,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [top, left]
  );
  if (isDragging) return <div ref={drag} />;
  return (
    <div
      className="window edit-panel"
      ref={drag}
      style={{ top: top + "px", left: left + "px" }}
    >
      <div className="title-bar">
        <div className="title-bar-text">Edit</div>
      </div>
      <div className="window-body">
        <div className="field-row">
          <button className="button redo">Undo</button>
          <button className="button undo">Redo</button>
        </div>
      </div>
    </div>
  );
};

export default EditPanel;
