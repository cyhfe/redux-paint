import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProjects } from "../../api";
import { Stroke } from "../../types";

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
const initialState: ProjectsState = {
  pendding: false,
  error: null,
  projects: [],
};

export const getProjectsThunk = createAsyncThunk(
  "products/getProduct",
  async (params, { rejectWithValue }) => {
    try {
      const res = await getProjects();
      return res;
    } catch (error) {
      return rejectWithValue('error');
    }
  }
);

export const projects = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjectsThunk.fulfilled, (state, action) => {
      state.pendding = false;
      state.projects = action.payload
    });
    builder.addCase(getProjectsThunk.rejected, (state, action) => {
      state.pendding = false;
      state.error = action.payload as string
    });
    builder.addCase(getProjectsThunk.pending, (state, action) => {
      state.pendding = true;
    });
  },
});

export default projects.reducer;
