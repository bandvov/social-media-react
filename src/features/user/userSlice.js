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
    posts: [
      {
        id: 1,
        content:
          "test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test",
        author_name: "test test",
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
        id: 2,
        content: "test",
        author_name: "test",
        created_at: Date.now(),
        total_comments_count: 8,
      },
      {
        id: 3,
        content: "test",
        author_name: "test",
        created_at: Date.now(),
        share_count: 33,
      },
      {
        id: 4,
        content: "test",
        author_name: "test",
        created_at: Date.now(),
        total_reactions_count: 44,
      },
    ],
  },
  reducers: {
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
    fetchUserPostsRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchUserPostsSuccess: (state, action) => {
      state.loading = false;
      state.posts = [...state.posts, ...action.payload];
      state.hasMorePosts = action.payload.hasMore;
      state.page += 1;
    },
    fetchUserPostsFailure: (state, action) => {
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
  fetchUserPostsFailure,
  fetchUserPostsRequest,
  fetchUserPostsSuccess,
  fetchUserProfileFailure,
  fetchUserProfileRequest,
  fetchUserProfileSuccess,
  updateUserFailure,
  updateUserRequest,
  updateUserSuccess,
} = profileSlice.actions;
export default profileSlice.reducer;
