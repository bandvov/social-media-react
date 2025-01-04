import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: {
      created_at: Date.now(),
      email: "bla@bla.test",
      followers_count: 122,
      followees_count: 342,
      posts_count: 88,
    },
  },
  reducers: {
    profileRequest: (state) => {
      state.loading = true;
      state.error = false;
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

export const { profileRequest, success, failure } = profileSlice.actions;
export default profileSlice.reducer;
