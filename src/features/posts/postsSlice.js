import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  page: 1,
  loading: false,
  hasMore: true,
  error: null,
};

const postsSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    setInitialPostsState: (state) => {
      state = initialState;
    },
    fetchPostsRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchPostsSuccess: (state, action) => {
      state.loading = false;
      state.data = [...state.data, ...action.payload.data];
      state.hasMore = action.payload.hasMore;
      state.page += 1;
    },
    fetchPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    removePostRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    removePostSuccess: (state, action) => {
      state.loading = false;
      state.posts = [
        ...state.posts.filter((post) => {
          return post.id !== action.payload;
        }),
      ];
    },
    removePostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createPostRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    createPostSuccess: (state, action) => {
      state.loading = false;
      state.posts = state.posts.unshift(action.payload);
    },
    createPostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchUserPostsRequest: (state) => {
      state.loadingoading = true;
      state.etchUserPostsError = false;
    },
    fetchUserPostsSuccess: (state, action) => {
      state.loading = false;
      state.data = [...state.data, ...action.payload.data];
      state.hasMore = action.payload.hasMore;
      state.page += 1;
    },
    fetchUserPostsFailure: (state, action) => {
      state.fetchUserPostsLoading = false;
      state.fetchUserPostsError = action.payload;
    },
  },
});

export const {
  fetchUserPostsFailure,
  fetchUserPostsRequest,
  fetchUserPostsSuccess,
  fetchPostsFailure,
  fetchPostsRequest,
  fetchPostsSuccess,
  removePostFailure,
  removePostSuccess,
  removePostRequest,
  createPostFailure,
  createPostRequest,
  createPostSuccess,
  setInitialPostsState,
} = postsSlice.actions;
export default postsSlice.reducer;
