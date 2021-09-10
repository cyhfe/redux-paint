import "./filePanel.css";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../ItemTypes";
import { useDispatch } from "react-redux";
import { saveAs } from 'file-saver';

type Props = {
  top: number;
  left: number;
};

const FilePanel = ({ top, left }: Props) => {
  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.FILE_PANEL,
      item: {
        type: ItemTypes.FILE_PANEL,
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
      className="window file-panel"
      ref={drag}
      style={{ top: top + "px", left: left + "px" }}>
      <div className="title-bar">
        <div className="title-bar-text">File</div>
      </div>
      <div className="window-body">
        <div className="field-row">
          <button
            className="button clear"
            onClick={() => {}}>
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilePanel;
