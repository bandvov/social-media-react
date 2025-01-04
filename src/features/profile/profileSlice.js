import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: {
      first_name: "",
      created_at: Date.now(),
      email: "bla@bla.test",
      followers_count: 122,
      followees_count: 342,
      posts_count: 88,
    },
  },
  reducers: {
    fetchProfileRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    updateProfileRequest: (state) => {
      state.loading = true;
    },
    success: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    failure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchProfileRequest, updateProfileRequest, success, failure } =
  profileSlice.actions;
export default profileSlice.reducer;
