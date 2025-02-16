import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  total: 0,
  profile: {},
  data: [
    {
      id: 1,
      email: "dasdas@ad.asd",
      username: "adsad",
      role: "user",
      created_at: new Date().toLocaleDateString(),
      updated_at: new Date().toLocaleDateString(),
      status: "active",
    },
    {
      id: 2,
      email: "dasdas2@ad.asd",
      username: "adsad",
      role: "user",
      created_at: new Date().toLocaleDateString(),
      updated_at: new Date().toLocaleDateString(),
      status: "active",
    },
    {
      id: 3,
      email: "dasdas3@ad.asd",
      username: "adsad",
      role: "admin",
      created_at: new Date().toLocaleDateString(),
      updated_at: new Date().toLocaleDateString(),
      status: "active",
    },
  ],
  loading: {
    fetchUserProfile: false,
    fetchUsers: false,
    updateUser: false,
  },
  errors: {
    fetchUserProfile: false,
    fetchUsers: false,
    updateUser: false,
  },
};
const profileSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setInitialUserState: (state) => {
      state.profile = {};
    },
    fetchUserProfileRequest: (state) => {
      state.loading.fetchUserProfile = true;
      state.errors.fetchUserProfile = false;
    },
    fetchUserProfileSuccess: (state, action) => {
      state.loading.fetchUserProfile = false;
      state.profile = action.payload;
    },
    fetchUserProfileFailure: (state, action) => {
      state.loading.fetchUserProfile = false;
      state.errors.fetchUserProfile = action.payload;
    },
    updateUserRequest: (state) => {
      state.loading.updateUser = true;
    },
    updateUserSuccess: (state) => {
      state.loading.updateUser = false;
    },
    updateUserFailure: (state, action) => {
      state.loading.updateUser = false;
      state.errors.updateUser = action.payload;
    },
    fetchUsersRequest: (state) => {
      state.loading.fetchUsers = true;
      state.errors.fetchUsers = null;
    },
    fetchUsersSuccess: (state, action) => {
      state.loading.fetchUsers = false;
      state.data = [...state.data, ...action.payload.data];
      state.total = action.payload.total;
    },
    fetchUsersFailure: (state, action) => {
      state.loading.fetchUsers = false;
      state.errors.fetchUsers = action.payload;
    },
  },
});

export const {
  fetchUserProfileFailure,
  fetchUserProfileRequest,
  fetchUserProfileSuccess,
  updateUserFailure,
  updateUserRequest,
  updateUserSuccess,
  fetchUsersFailure,
  fetchUsersRequest,
  fetchUsersSuccess,
  setInitialUserState,
} = profileSlice.actions;
export default profileSlice.reducer;
