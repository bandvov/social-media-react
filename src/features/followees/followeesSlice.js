import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  page: 1,
  hasMore: true,
  loading: {
   fetchFollowees: false,
    removeFollowee:false,
    
  },
  errors: {
    fetchFollowees: false,
     removeFollowee:false

  },
};
const followeesSlice = createSlice({
  name: "followees",
  initialState,
  reducers: {
    setInitialFolloweesState: (state) => {
      state = initialState;
    },
    fetchFolloweesRequest: (state) => {
      state.loading.fetchFollowees = true;
      state.errors.fetchFollowees = false;
    },
    fetchFolloweesSuccess: (state, action) => {

      state.loading.fetchFollowees = false;
      state.data = [...state.data, ...action.payload.data];
      state.hasMore = action.payload.hasMore;
      state.page += 1;
    },
    fetchFolloweesFailure: (state, action) => {
      state.loading.fetchFollowees = false;
      state.errors.fetchFollowees = action.payload;
    },
    removeFolloweeRequest: (state) => {
      state.loading.removeFollowee = true;
      state.errors.removeFollowee = false;
    },
    removeFolloweeSuccess: (state, action) => {
      state.loading.removeFollowee = false;
      state.data = [
        ...state.data.filter((f) => {
          return f.id !== action.payload;
        }),
      ];
    },
    removeFolloweeFailure: (state, action) => {
      state.loading.removeFollowee = false;
      state.errors.removeFollowee = action.payload;
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
