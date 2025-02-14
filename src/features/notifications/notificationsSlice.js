// src/features/notificationsSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    data: [],
    page: 1,
    unread_count: 0,
    hasMore: true,
    loading: false,
    error: false,
  },
  reducers: {
    fetchNotificationsStart: (state) => {
      state.loading = true;
    },
    fetchNotificationsSuccess: (state, action) => {
      state.data = [...state.data, ...action.payload.data];
      state.hasMore = action.payload.hasMore;
      state.loading = false;
      state.unread_count = state.unread_count + action.payload.data?.length;
    },
    fetchNotificationsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchNotificationsStart,
  fetchNotificationsSuccess,
  fetchNotificationsFailure,
  setHasMoreNotifications,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
