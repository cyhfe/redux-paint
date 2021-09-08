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
  historyIndex: 0;
};

export type Project = {
  id: string;
  name: string;
  image: string;
};
