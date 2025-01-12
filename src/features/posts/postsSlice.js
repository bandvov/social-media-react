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
  initialState: {
    posts: [
      {
        id: 1,
        content:
          "test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test",
        author_name: "test test",
        created_at: Date.now(),
        reactions: [{ reaction_type: "Dislike", count: 1 }],
        total_count: 122,
      },
      {
        id: 2,
        content:
          "test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test",
        author_name: "test",
        created_at: Date.now(),
        reactions: [
          { reaction_type: "Love", count: 1 },
          { reaction_type: "Dislike", count: 33 },
          { reaction_type: "Angry", count: 22 },
        ],
        total_reactions_count: 44,
        total_comments_count: 8,
        share_count: 33,
      },
      {
        id: 3,
        content:
          "test blabla <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Giselle_of_Aespa%2C_July_25%2C_2024_%282%29.png/526px-Giselle_of_Aespa%2C_July_25%2C_2024_%282%29.png' /> some text bla bla",
        author_name: "test",
        created_at: Date.now(),
        reactions: [{ reaction_type: "Love", count: 1 }],
        total_count: 122,
      },
    ],
  },
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
      state.hasMorePosts = action.payload.hasMore;
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
      state.etchUserPostsLoading = true;
      state.etchUserPostsError = false;
    },
    fetchUserPostsSuccess: (state, action) => {
      state.etchUserPostsLoading = false;
      state.posts = [...state.posts, ...action.payload];
      state.hasMorePosts = action.payload.hasMore;
      state.page += 1;
    },
    fetchUserPostsFailure: (state, action) => {
      state.etchUserPostsLoading = false;
      state.etchUserPostsError = action.payload;
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
