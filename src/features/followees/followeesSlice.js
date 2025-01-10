import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  page: 1,
  isLoading: false,
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
  setInitialFolloweesState
} = followeesSlice.actions;

export default followeesSlice.reducer;
