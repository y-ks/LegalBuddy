import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBookings = createAsyncThunk(
  "booking/fetchBookings",
  async () => {
    const response = await axios.get("/api/bookings/getallbookings");
    return response.data;
  }
);

const bookingSlice = createSlice({
  name: "booking",
  loading: false,
  initialState: {
    bookings: [],
    status: null,
  },
  reducers: {
    // bookingState: (state, action) => {
    //   state.bookings = state.bookings.filter(
    //     (booking) => booking._id != action.payload.id
    //   );
    // },
  },
  extraReducers: {
    [fetchBookings.pending]: (state, action) => {
      state.status = "loading";
      state.loading = true;
    },
    [fetchBookings.fulfilled]: (state, { payload }) => {
      state.bookings = payload;
      state.status = "success";
      state.loading = false;
    },
    [fetchBookings.rejected]: (state, action) => {
      state.status = "failed";
      state.loading = false;
    },
  },
});

// export const { lawyerState } = lawyerSlice.actions;

export default bookingSlice.reducer;
