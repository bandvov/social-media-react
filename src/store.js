import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from "./features/auth/authSlice";
import authSaga from "./features/auth/authSaga";
import themeReducer from "./features/theme/themeSlice";
import postReducer from "./features/posts/postsSlice";
import userReducer from "./features/user/userSlice";
import userSaga from "./features/user/userSaga";
import postsSaga from "./features/posts/postsSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    user: userReducer,
    post: postReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(authSaga);
sagaMiddleware.run(userSaga);
sagaMiddleware.run(postsSaga);

export default store;
