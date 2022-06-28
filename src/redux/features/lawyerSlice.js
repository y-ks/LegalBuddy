import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLawyers = createAsyncThunk(
  "lawyer/fetchLawyers",
  async () => {
    const response = await axios.get("/api/lawyers/getalllawyers");
    console.log(response.data);
    return response.data;
  }
);

const lawyerSlice = createSlice({
  name: "lawyer",
  initialState: {
    lawyers: [],
    status: null,
  },
  reducers: {},
  extraReducers: {
    [fetchLawyers.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchLawyers.fulfilled]: (state, { payload }) => {
      state.lawyers = payload;
      state.status = "success";
    },
    [fetchLawyers.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default lawyerSlice.reducer;
