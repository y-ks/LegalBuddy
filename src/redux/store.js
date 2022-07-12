import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./features/categorySlice";
import lawyerReducer from "./features/lawyerSlice";
import userReducer from "./features/userSlice";
import modalReducer from "./features/modalSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    modalDialog: modalReducer,
    getalllawyers: lawyerReducer,
    getallusers: userReducer,
  },
});
