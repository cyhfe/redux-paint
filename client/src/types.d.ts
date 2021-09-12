export type Point = {
  x: number;
  y: number;
};

export type Stroke = {
  points: Point[];
  color: string;
};

export type RootState = {
  currentStroke: Stroke;
  strokes: Stroke[];
  historyIndex: number;
  modalVisible: ModalState;
  projects: ProjectsState
};

// export type Project = {
//   id: string;
//   name: string;
//   image: string;
// };

export type ModalState = {
  isShown: boolean;
  modalName: string | null;
};

type Project = {
  id: string
  name: string;
  strokes: Stroke[];
  image: string;
};

type ProjectsState = {
  pendding: boolean;
  error: string | null;
  projects: Project[];
};