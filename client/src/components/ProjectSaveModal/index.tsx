import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hide } from "../../modules/modal/slice";
import { useEffect } from "react";
import { getBase64Thumbnail } from "../../utils/thumbnail";
import { getCanvasImage } from "../../utils/cavasUtils";
import { useCanvas } from "../../canvasContext";
import { createProject } from "../../api";
import { useState } from "react";
import { strokesSelector } from "../../modules/selectors";
const ProjectSaveModal = () => {
  const [projectName, setProjectName] = useState("");
  const strokes = useSelector(strokesSelector);
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  const canvasRef = useCanvas();
  useEffect(() => {
    const handleOutsideClick = (e: Event) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        dispatch(hide());
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [dispatch]);

  const handleSave = async () => {
    if (!projectName) return;
    const file = await getCanvasImage(canvasRef.current);
    if (!file) return;
    const image = await getBase64Thumbnail({ file: file, scale: 0.2 });
    try {
      const res = await createProject(projectName, strokes, image);
      if (res.success) {
        dispatch(hide());
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="modal">
      <div className="modal-content" ref={modalRef}>
        <div className="window">
          <div className="title-bar">
            <div className="title-bar-text">Save</div>
          </div>
          <div className="window-body">
            <div className="field-row-stacked">
              <label htmlFor="projectName">Project name</label>
              <input
                id="projectName"
                type="text"
                onChange={(e) => setProjectName(e.target.value)}
                value={projectName}
              />
            </div>
            <div className="field-row">
              <button onClick={handleSave}>Save</button>
              <button onClick={() => dispatch(hide())}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSaveModal;
