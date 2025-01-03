import { call, put, takeLatest } from "redux-saga/effects";
import { failure, postsRequest, success } from "./postsSlice";
import { fetchPosts } from "./postsApi";

function* handleFetchPosts(action) {
  try {
    // clear error message
    yield put(failure(""));
    const posts = yield call(fetchPosts, action.payload);
    yield put(success(posts.data));
  } catch (error) {
    yield put(failure(error.message));
  }
}

export default function* postsSaga() {
  yield takeLatest(postsRequest.type, handleFetchPosts);
}
