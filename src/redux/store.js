import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./features/categorySlice";
import modalReducer from "./features/modalSlice";

export const store = configureStore({
  reducer: { category: categoryReducer, modalDialog: modalReducer },
});
