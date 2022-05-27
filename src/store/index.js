import { configureStore } from "@reduxjs/toolkit";
import category from "./categorySlice";

export const store = configureStore({
  reducer: { category },
});
