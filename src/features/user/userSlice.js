import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "user",
  initialState: {
    profile: {
      id: 19879,
      first_name: "",
      created_at: Date.now(),
      email: "bla@bla.test",
      followers_count: 122,
      followees_count: 342,
      posts_count: 88,
      bio: "bla bla some bio",
      profile_pic: "https://i.mydramalist.com/4Jjdk_5c.jpg",
    },
  },
  reducers: {
    setInitialUserState: (state) => {
      state.profile = {};
    },
    fetchUserProfileRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchUserProfileSuccess: (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    },
    fetchUserProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserRequest: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state) => {
      state.loading = false;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchUserProfileFailure,
  fetchUserProfileRequest,
  fetchUserProfileSuccess,
  updateUserFailure,
  updateUserRequest,
  updateUserSuccess,
  setInitialUserState
} = profileSlice.actions;
export default profileSlice.reducer;
