import { useDispatch } from "react-redux";
import { hide } from "../../modules/modal/slice";
const ProjectSaveModal = () => {
  const dispatch = useDispatch();
  return (
    <div className="modal" onClick={(e)=>{
      // if(e.nativeEvent.target === )
      console.log(e.nativeEvent.target)
    }}>
      <div className="modal-content">
        <div className="window">
          <div className="title-bar">
            <div className="title-bar-text">Save</div>
          </div>
          <div className="window-body">
            <div className="field-row-stacked">
              <label htmlFor="projectName">Project name</label>
              <input id="projectName" type="text" />
            </div>
            <div className="field-row">
              <button>Save</button>
              <button onClick={() => dispatch(hide())}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSaveModal;
