import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  data: [],
  page: 1,
  hasMore: true,
  loading: {
   fetchFollowers: false,
    removeFollower:false
  },
  errors: {
    fetchFollowers: false,
     removeFollower:false

  },
};
const followersSlice = createSlice({
  name: "followers",
  initialState: initialState,
  reducers: {
    setInitialFollowersState: (state) => {
      state = initialState;
    },
    fetchFollowersRequest: (state) => {
      state.loading.fetchFollowers = true;
      state.errors.fetchFollowers = false;
    },
    fetchFollowersSuccess: (state, action) => {
      state.loading.fetchFollowers = false;
      state.data = [...state.data, ...action.payload.data];
      state.hasMore = action.payload.hasMore;
      state.page += 1;
    },
    fetchFollowersFailure: (state, action) => {
      state.loading.fetchFollowers = false;
      state.errors.fetchFollowers = action.payload;
    },
    removeFollowerRequest: (state) => {
      state.loading.removeFollower = true;
      state.errors.removeFollower = false;
    },
    removeFollowerSuccess: (state, action) => {
      state.loading.removeFollower = false;
      state.data = [
        ...state.data.filter((f) => {
          return f.id !== action.payload;
        }),
      ];
    },
    removeFollowerFailure: (state, action) => {
      state.loading.removeFollower = false;
      state.errors.removeFollower = action.payload;
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
