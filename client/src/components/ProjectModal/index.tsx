import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hide } from "../../modules/modal/slice";
import { useEffect } from "react";
import { projectsSelector } from "../../modules/selectors";
import {  setStrokes } from "../../modules/sharedActions";

const ProjectModal = () => {
  const projects = useSelector(projectsSelector);
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
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
  const handleThumbnailClick = (id: string) => {
    const target = projects.projects.find((p) => p.id === id);
    if (!target) return;
    dispatch(hide());
    dispatch(setStrokes(target.strokes));
  };
  return (
    <div className="modal">
      <div className="modal-content" ref={modalRef}>
        <div className="window">
          <div className="title-bar">
            <div className="title-bar-text">Counter</div>
            <div className="title-bar-controls">
              <button aria-label="Close" onClick={() => dispatch(hide())} />
            </div>
          </div>
          <div className="projects-container">
            {projects.pendding ? (
              <div>loading...</div>
            ) : projects.error ? (
              <div>error</div>
            ) : (
              projects.projects.map((project) => {
                return (
                  <div key={project.id} className="project-card">
                    <img
                      src={project.image}
                      alt="thumbnail"
                      onClick={() => handleThumbnailClick(project.id)}
                    />
                    <div>{project.name}</div>
                  </div>
                );
              })
            )}
            {}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
