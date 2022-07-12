import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await axios.get("/api/users/getallusers");
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  loading: false,
  initialState: {
    users: [],
    status: null,
  },
  reducers: {
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user._id != action.payload.id);
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.status = "loading";
      state.loading = true;
    },
    [fetchUsers.fulfilled]: (state, { payload }) => {
      state.users = payload;
      state.status = "success";
      state.loading = false;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.status = "failed";
      state.loading = false;
    },
  },
});

export const { deleteUser } = userSlice.actions;

export default userSlice.reducer;
