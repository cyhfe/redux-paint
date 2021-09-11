import "./colorPanel.css";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { setColor } from "../../modules/currentStroke/slice";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../ItemTypes";
import {currentStrokeSelector} from '../../modules/selectors'

const COLORS = [
  "#000",
  "#264653",
  "#2a9d8f",
  "#e9c46a",
  "#f4a261",
  "#e76f51",
  "#fff",
];

type Props = {
  left: number;
  top: number;
};
export default function ColorPanel({ left, top }: Props) {
  const currentStroke = useSelector(currentStrokeSelector)
  const dispatch = useDispatch();
  const onColorChange = (color: string) => {
    dispatch(setColor(color));
  };
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.COLOR_PANEL,
      item: {
        type: ItemTypes.COLOR_PANEL,
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
      className="window colors-panel"
      ref={drag}
      style={{ top: top + "px", left: left + "px" }}
    >
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
              active: color === currentStroke.color,
            })}
            style={{ backgroundColor: color }}
          ></div>
        ))}
      </div>
    </div>
  );
}
