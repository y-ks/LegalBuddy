import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLawyers = createAsyncThunk(
  "lawyer/fetchLawyers",
  async () => {
    const response = await axios.get("/api/lawyers/getalllawyers");
    return response.data;
  }
);

const lawyerSlice = createSlice({
  name: "lawyer",
  loading: false,
  initialState: {
    lawyers: [],
    status: null,
  },
  reducers: {},
  extraReducers: {
    [fetchLawyers.pending]: (state, action) => {
      state.status = "loading";
      state.loading = true;
    },
    [fetchLawyers.fulfilled]: (state, { payload }) => {
      state.lawyers = payload;
      state.status = "success";
      state.loading = false;
    },
    [fetchLawyers.rejected]: (state, action) => {
      state.status = "failed";
      state.loading = false;
    },
  },
});

export default lawyerSlice.reducer;
