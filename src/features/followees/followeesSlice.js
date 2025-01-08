import { createSlice } from "@reduxjs/toolkit";

const followeesSlice = createSlice({
  name: "followees",
  initialState: {
    data: [],
    page: 1,
    isLoading: false,
    hasMore: true,
    error: null,
  },
  reducers: {
    fetchFolloweesRequest: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    fetchFolloweesSuccess: (state, action) => {
      console.log({ action });

      state.isLoading = false;
      state.data = [...state.data, ...action.payload.data];
      state.page = action.payload.nextPage;
      state.hasMore = action.payload.hasMore;
    },
    fetchFolloweesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchFolloweesRequest,
  fetchFolloweesSuccess,
  fetchFolloweesFailure,
} = followeesSlice.actions;

export default followeesSlice.reducer;
