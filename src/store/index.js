import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import modalReducer from "./modalSlice";

export const store = configureStore({
  reducer: { category: categoryReducer, modalDialog: modalReducer },
});
