import { createSlice } from "@reduxjs/toolkit";

const followeesSlice = createSlice({
  name: "followees",
  initialState: {
    data: [
      {
        id: 166,
        username: "test",
        email: "bla@bla.bla",
        profile_pic:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Aespa_Karina_%EC%B9%B4%EB%A6%AC%EB%82%98_20240618_03.png/800px-Aespa_Karina_%EC%B9%B4%EB%A6%AC%EB%82%98_20240618_03.png",
        bio: "test test test bio",
      },
      {
        id: 28,
        username: "test",
        email: "bla@bla.bla",
        profile_pic:
          "https://ellesg-prod.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2024/04/ellesg-bai-lu-feature.png",
      },
      {
        id: 93,
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
      state.error = "";
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
