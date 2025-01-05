import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from "./features/auth/authSlice";
import themeReducer from "./features/theme/themeSlice";
import postReducer from "./features/posts/postsSlice";
import userReducer from "./features/user/userSlice";
import followersReducer from "./features/followers/followersSlice";
import rootSaga from "./features";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    user: userReducer,
    post: postReducer,
    followers: followersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
