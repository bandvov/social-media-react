import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  page: 1,
  loading: {
    createPost: false,
    removePost: false,
    fetchPosts: false,
    fetchUserPosts: false,
  },
  hasMore: true,
  errors: {
    createPost: false,
    removePost: false,
    fetchPosts: false,
    fetchUserPosts: false,
  },
};

const postsSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    setInitialPostsState: (state) => {
      state = initialState;
    },
    fetchPostsRequest: (state) => {
      state.loading.fetchPosts = true;
      state.errors.fetchPosts = false;
    },
    fetchPostsSuccess: (state, action) => {
      state.loading.fetchPosts = false;
      state.data = [...state.data, ...action.payload.data];
      state.hasMore = action.payload.hasMore;
      state.page += 1;
    },
    fetchPostsFailure: (state, action) => {
      state.loading.fetchPosts = false;
      state.errors.fetchPosts = action.payload;
    },
    removePostRequest: (state) => {
      state.loading.removePost = true;
      state.errors.removePost = false;
    },
    removePostSuccess: (state, action) => {
      state.loading.removePost = false;
      state.data = [
        ...state.data.filter((post) => {
          return post.id !== action.payload;
        }),
      ];
    },
    removePostFailure: (state, action) => {
      state.loading.removePost = false;
      state.errors.removePost = action.payload;
    },
    createPostRequest: (state) => {
      state.loading.createPost = true;
      state.errors.createPost = false;
    },
    createPostSuccess: (state, action) => {
      state.loading.createPost = false;
      state.data = state.data.unshift(action.payload);
    },
    createPostFailure: (state, action) => {
      state.loading.createPost = false;
      state.errors.createPost = action.payload;
    },
    fetchUserPostsRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchUserPostsSuccess: (state, action) => {
      state.loading.fetchUserPosts = false;
      state.data = [...state.data, ...action.payload.data];
      state.hasMore = action.payload.hasMore;
      state.page += 1;
    },
    fetchUserPostsFailure: (state, action) => {
      state.loading.fetchUserPosts = false;
      state.errors.fetchUserPosts = action.payload;
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
