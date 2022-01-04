import { Stroke } from './types';

const API_URL = process.env.REACT_APP_API_URL;

export const createProject = (
  name: string,
  strokes: Stroke[],
  image: string
) => {
  return fetch(`${API_URL}/api/projects`, {
    method: 'POST',
    headers: {
      Accepet: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      strokes,
      image,
    }),
  }).then((res) => res.json());
};

export const getProject = (projectId: string) =>
  fetch(`${API_URL}/api/projects/${projectId}`).then((res) => res.json());

export const getProjects = () =>
  fetch(`${API_URL}/api/projects/`).then((res) => res.json());
