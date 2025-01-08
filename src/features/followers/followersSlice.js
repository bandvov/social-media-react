import { createSlice } from "@reduxjs/toolkit";

const followersSlice = createSlice({
  name: "followers",
  initialState: {
    data: [],
    page: 1,
    isLoading: false,
    hasMore: true,
    error: null,
  },
  reducers: {
    fetchFollowersRequest: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    fetchFollowersSuccess: (state, action) => {
      state.isLoading = false;
      state.data = [...state.data, ...action.payload.data];
      state.page = action.payload.nextPage;
      state.hasMore = action.payload.hasMore;
    },
    fetchFollowersFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    removeFollowerRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    removeFollowerSuccess: (state, action) => {
      state.loading = false;
      state.followers = [
        ...state.followers.filter((f) => {
          return f.id !== action.payload;
        }),
      ];
    },
    removeFollowerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchFollowersRequest,
  fetchFollowersSuccess,
  fetchFollowersFailure,
  removeFollowerFailure,
  removeFollowerRequest,
  removeFollowerSuccess,
} = followersSlice.actions;

export default followersSlice.reducer;
