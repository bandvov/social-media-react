import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  page: 1,
  loading: false,
  hasMore: true,
  error: null,
};
const followeesSlice = createSlice({
  name: "followees",
  initialState,
  reducers: {
    setInitialFolloweesState: (state) => {
      state = initialState;
    },
    fetchFolloweesRequest: (state) => {
      state.loading = true;
      state.error = "";
    },
    fetchFolloweesSuccess: (state, action) => {
      console.log({ action });

      state.loading = false;
      state.data = [...state.data, ...action.payload.data];
      state.page = action.payload.nextPage;
      state.hasMore = action.payload.hasMore;
    },
    fetchFolloweesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    removeFolloweeRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    removeFolloweeSuccess: (state, action) => {
      state.loading = false;
      state.followees = [
        ...state.followees.filter((f) => {
          return f.id !== action.payload;
        }),
      ];
    },
    removeFolloweeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchFolloweesRequest,
  fetchFolloweesSuccess,
  fetchFolloweesFailure,
  removeFolloweeFailure,
  removeFolloweeRequest,
  removeFolloweeSuccess,
  setInitialFolloweesState,
} = followeesSlice.actions;

export default followeesSlice.reducer;
