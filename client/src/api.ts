import { Stroke } from "./types";
export const createProject = (
  name: string,
  strokes: Stroke[],
  image: string
) => {
  return fetch("/api/projects", {
    method: "POST",
    headers: {
      Accepet: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      strokes,
      image,
    }),
  }).then(res => res.json());
};

export const getProject = (projectId: string) =>
  fetch(`/api/projects/${projectId}`).then((res) =>
    res.json()
  );
