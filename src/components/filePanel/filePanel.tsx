import "./filePanel.css";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../ItemTypes";
import { saveAs } from "file-saver";
import { getCanvasImage } from "../../utils/cavasUtils";
import { useCanvas } from "../../canvasContext";
type Props = {
  top: number;
  left: number;
};

const FilePanel = ({ top, left }: Props) => {
  const canvasRef = useCanvas();
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

  const exportToFile = async () => {
    const blob = await getCanvasImage(canvasRef.current);
    if (!blob) return;
    saveAs(blob, "drawing.png");
  };

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
          <button className="button clear" onClick={exportToFile}>
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilePanel;
