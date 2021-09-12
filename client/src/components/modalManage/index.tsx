import { useSelector } from "react-redux";
import { modalVisibleSelector } from "../../modules/selectors";
import ProjectModal from "../ProjectModal";
import ProjectSaveModal from "../ProjectSaveModal";

const ModalManage = () => {
  const { modalName } = useSelector(modalVisibleSelector);
  switch (modalName) {
    case "PROJECT_MODAL": {
      return <ProjectModal />;
    }
    case "PROJECT_SAVE_MODAL": {
      return <ProjectSaveModal />;
    }
    default: {
      return null;
    }
  }
};

export default ModalManage;
