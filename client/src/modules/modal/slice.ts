import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalState } from "../../types";

const initialState: ModalState = {
  isShown: false,
  modalName: null,
};

const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    show(state, action: PayloadAction<string>) {
      state.isShown = true;
      state.modalName = action.payload;
    },
    hide() {
      return {
        isShown: false,
        modalName: null,
      };
    },
  },
});

export default modal.reducer;
export const { show, hide } = modal.actions;
