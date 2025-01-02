import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: {
      image: "test",
      dateCreated: Date.now(),
      email: "bla@test.test",
      followersCount: 22,
      followeesCount: 122,
      postsCount: 555,
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
