import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: false, error: null },
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    registrationRequest: (state) => {
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

export const { loginRequest, registrationRequest, success, failure } =
  authSlice.actions;
export default authSlice.reducer;
