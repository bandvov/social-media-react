import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from "./features/auth/authSlice";
import themeReducer from "./features/theme/themeSlice";
import profileReducer from "./features/profile/profileSlice";
import postReducer from "./features/posts/postsSlice";
import authSaga from "./features/auth/authSaga";
import profileSaga from "./features/profile/profileSaga";
import postsSaga from "./features/posts/postsSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    profile: profileReducer,
    post: postReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(authSaga);
sagaMiddleware.run(profileSaga);
sagaMiddleware.run(postsSaga);

export default store;
