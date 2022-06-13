import { createSlice } from "@reduxjs/toolkit";

const initialState = { isModalShow: false, lawyerId: 1003 };

export const modalSlice = createSlice({
  name: "modalShow",
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.isModalShow = true;
      state.lawyerId = action.payload;
    },
    hideModal: (state) => {
      state.isModalShow = false;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
