import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    data: {},
    loading: {
      addComment: false,
      fetchComments: false,
    },
    errors: {
      addComment: null,
      fetchComments: null,
    },
  },
  reducers: {
    addCommentRequest: (state) => {
      state.loading.addComment = true;
    },
    addCommentSuccess: (state, action) => {
      state.loading.addComment = false;
      state.data[action.payload.entity_id].push(action.payload.data);
    },
    addCommentFailure: (state, action) => {
      state.loading.addComment = false;
      state.errors.addComment = action.payload;
    },
    fetchCommentsRequest: (state) => {
      state.loading.fetchComments = true;
    },
    fetchCommentsSuccess: (state, action) => {
      state.loading.fetchComments = false;
      const { entity_id, data } = action.payload;

      !state.data[entity_id]
        ? (state.data[entity_id] = data)
        : (state.data[entity_id] = [...state.data[entity_id], ...data]);
    },
    fetchCommentsFailure: (state, action) => {
      state.loading.fetchComments = false;
      state.errors.fetchComments = action.payload;
    },
  },
});

export const {
  addCommentRequest,
  addCommentSuccess,
  addCommentFailure,
  fetchCommentsRequest,
  fetchCommentsFailure,
  fetchCommentsSuccess,
} = commentsSlice.actions;

export default commentsSlice.reducer;
