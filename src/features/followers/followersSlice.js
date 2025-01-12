import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  page: 1,
  loading: false,
  hasMore: true,
  error: null,
};
const followersSlice = createSlice({
  name: "followers",
  initialState: initialState,
  reducers: {
    setInitialFollowersState: (state) => {
      state = initialState;
    },
    fetchFollowersRequest: (state) => {
      state.loading = true;
      state.error = "";
    },
    fetchFollowersSuccess: (state, action) => {
      state.loading = false;
      state.data = [...state.data, ...action.payload.data];
      state.page = action.payload.nextPage;
      state.hasMore = action.payload.hasMore;
    },
    fetchFollowersFailure: (state, action) => {
      state.loading = false;
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
  setInitialFollowersState,
} = followersSlice.actions;

export default followersSlice.reducer;
