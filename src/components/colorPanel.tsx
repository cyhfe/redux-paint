import "./colorPanel.css";
import { useState } from "react";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { setColor } from "../actions";
const COLORS = [
  "#000",
  "#264653",
  "#2a9d8f",
  "#e9c46a",
  "#f4a261",
  "#e76f51",
  "#fff",
];
export default function ColorPanel() {
  const [currentColor, setCurrentColor] = useState("#000");
  const dispatch = useDispatch();
  const onColorChange = (color: string) => {
    setCurrentColor(color);
    dispatch(setColor(color));
  };
  return (
    <div className="window colors-panel">
      <div className="title-bar">
        <div className="title-bar-text">Colors</div>
      </div>
      <div className="window-body color-container">
        {COLORS.map((color: string) => (
          <div
            key={color}
            onClick={() => {
              onColorChange(color);
            }}
            className={classNames("color", {
              active: color === currentColor,
            })}
            style={{ backgroundColor: color }}></div>
        ))}
      </div>
    </div>
  );
}
