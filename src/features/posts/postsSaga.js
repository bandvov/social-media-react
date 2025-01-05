import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchPostsFailure,
  fetchPostsRequest,
  fetchPostsSuccess,
  removePostFailure,
  removePostsRequest,
  removePostSuccess,
} from "./postsSlice";
import { fetchPosts, removePost } from "./postsApi";

function* handleFetchPosts(action) {
  try {
    // clear error message
    yield put(fetchPostsFailure(""));
    const posts = yield call(fetchPosts, action.payload);
    yield put(fetchPostsSuccess(posts.data));
  } catch (error) {
    yield put(fetchPostsFailure(error.message));
  }
}
function* handleRemovePost(action) {
  console.log(action);

  try {
    // clear error message
    yield put(removePostFailure(""));
    yield call(removePost, action.payload);
    yield put(removePostSuccess(action.payload));
  } catch (error) {
    yield put(removePostFailure(error.message));
  }
}

export default function* postsSaga() {
  yield takeLatest(fetchPostsRequest.type, handleFetchPosts);
  yield takeLatest(removePostsRequest.type, handleRemovePost);
}
