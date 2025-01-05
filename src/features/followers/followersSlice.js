import { createSlice } from "@reduxjs/toolkit";

const followersSlice = createSlice({
  name: "followers",
  initialState: {
    data: [
      {
        id: 1,
        username: "test",
        email: "bla@bla.bla",
        profile_pic:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Elon_Musk_Royal_Society_crop.jpg/440px-Elon_Musk_Royal_Society_crop.jpg",
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
    fetchFollowersRequest: (state) => {
      state.isLoading = true;
    },
    fetchFollowersSuccess: (state, action) => {
      state.isLoading = false;
      state.data = [...state.data, ...action.payload.followers];
      state.page = action.payload.nextPage;
      state.hasMore = action.payload.hasMore;
    },
    fetchFollowersFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchFollowersRequest,
  fetchFollowersSuccess,
  fetchFollowersFailure,
} = followersSlice.actions;

export default followersSlice.reducer;