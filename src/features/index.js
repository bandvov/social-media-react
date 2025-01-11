import { all } from "redux-saga/effects";
import authSaga from "./auth/authSaga";
import userSaga from "./user/userSaga";
import postsSaga from "./posts/postsSaga";
import followersSaga from "./followers/followersSaga";
import followeesSaga from "./followees/followeesSaga";
import { commentsSaga } from "./comments/commentsSaga";

export default function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    postsSaga(),
    followersSaga(),
    followeesSaga(),
    commentsSaga(),
  ]);
}
