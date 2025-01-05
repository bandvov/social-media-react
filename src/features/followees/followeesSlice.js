import { createSlice } from "@reduxjs/toolkit";

const followeesSlice = createSlice({
  name: "followees",
  initialState: {
    data: [
      {
        id: 1,
        username: "test",
        email: "bla@bla.bla",
        profile_pic:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Aespa_Karina_%EC%B9%B4%EB%A6%AC%EB%82%98_20240618_03.png/800px-Aespa_Karina_%EC%B9%B4%EB%A6%AC%EB%82%98_20240618_03.png",
        bio: "test test test bio",
      },
      {
        id: 2,
        username: "test",
        email: "bla@bla.bla",
        profile_pic:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Giselle_of_Aespa%2C_July_25%2C_2024_%282%29.png/526px-Giselle_of_Aespa%2C_July_25%2C_2024_%282%29.png",
      },
      {
        id: 3,
        username: "test",
        email: "bla@bla.bla",
      },
    ],
    page: 1,
    isLoading: false,
    hasMore: true,
    error: null,
  },
  reducers: {
    fetchFolloweesRequest: (state) => {
      state.isLoading = true;
    },
    fetchFolloweesSuccess: (state, action) => {
      state.isLoading = false;
      state.data = [...state.data, ...action.payload.followees];
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
