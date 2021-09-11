import "./editPanel.css";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../ItemTypes";
import { useDispatch, useSelector } from "react-redux";
import { redo, undo } from "../../modules/historyIndex/slice";
import { reset } from "../../modules/sharedActions";
import { strokesSelector } from "../../modules/selectors";
type Props = {
  top: number;
  left: number;
};

const EditPanel = ({ top, left }: Props) => {
  const strokes = useSelector(strokesSelector);
  const dispatch = useDispatch();
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
          <button
            className="button redo"
            onClick={() => dispatch(undo(strokes.length))}
          >
            Undo
          </button>
          <button className="button undo" onClick={() => dispatch(redo())}>
            Redo
          </button>
          <button className="button clear" onClick={() => dispatch(reset())}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPanel;
