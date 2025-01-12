import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {
    addCommentRequest: (state) => {
      state.loading = true;
    },
    addCommentSuccess: (state, action) => {
      state.loading = false;
      state.comments.push(action.payload);
    },
    addCommentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { addCommentRequest, addCommentSuccess, addCommentFailure } =
  commentsSlice.actions;

export default commentsSlice.reducer;
