import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      id: 1,
      created_at: Date.now(),
      email: "bla@bla.test",
    },
    loading: false,
    error: null,
  },
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    registrationRequest: (state) => {
      state.loading = true;
    },
    logoutRequest: (state) => {
      state.loading = true;
    },
    success: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    failure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginRequest,
  registrationRequest,
  logoutRequest,
  success,
  failure,
} = authSlice.actions;
export default authSlice.reducer;
