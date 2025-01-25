import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  post: {},
  page: 1,
  loading: {
    createPost: false,
    removePost: false,
    fetchPosts: false,
    fetchUserPosts: false,
    addReaction: false,
    removeReaction: false,
  },
  hasMore: true,
  errors: {
    createPost: false,
    removePost: false,
    fetchPosts: false,
    fetchUserPosts: false,
    addReaction: false,
    removeReaction: false,
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
      state.loading.fetchUserPosts = true;
      state.errors.fetchUserPosts = false;
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
    addReactionRequest: (state) => {
      state.loading.addReaction = true;
    },
    addReactionSuccess: (state, action) => {
      state.loading.addReaction = false;
      const { entity_id, reaction } = action.payload;
      const post = state.data.find((post) => post.id === entity_id);
      if (post) {
        post.user_reaction = reaction;
      }
    },
    addReactionFailure: (state, action) => {
      state.loading.addReaction = false;
      state.errors.addReaction = action.payload;
    },
    removeReactionRequest: (state) => {
      state.loading.removeReaction = true;
    },
    removeReactionSuccess: (state, action) => {
      state.loading.removeReaction = false;
      const { entity_id } = action.payload;
      const post = state.data.find((post) => post.id === entity_id);
      if (post) {
        post.user_reaction = "";
      }
    },
    removeReactionFailure: (state, action) => {
      state.loading.removeReaction = false;
      state.errors.removeReaction = action.payload;
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
  addReactionFailure,
  addReactionRequest,
  addReactionSuccess,
  removeReactionFailure,
  removeReactionRequest,
  removeReactionSuccess,
  setInitialPostsState,
} = postsSlice.actions;
export default postsSlice.reducer;
