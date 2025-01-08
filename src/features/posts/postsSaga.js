import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchPostsFailure,
  fetchPostsRequest,
  fetchPostsSuccess,
  removePostFailure,
  removePostRequest,
  removePostSuccess,
  createPostFailure,
  createPostRequest,
  createPostSuccess,
} from "./postsSlice";
import { createPost, fetchPosts, removePost } from "./postsApi";

function* handleFetchPosts(action) {
  try {
    // clear error message
    const res = yield call(fetchPosts, action.payload);
    yield put(fetchPostsSuccess({ posts: res.data }));
  } catch (error) {
    yield put(fetchPostsFailure(error.message));
  }
}

function* handleCreatePost(action) {
  try {
    // clear error message
    yield call(createPost, action.payload);
    yield put(createPostSuccess(action.payload));
  } catch (error) {
    yield put(createPostFailure(error.message));
  }
}
function* handleRemovePost(action) {
  try {
    // clear error message
    yield call(removePost, action.payload);
    yield put(removePostSuccess(action.payload));
  } catch (error) {
    yield put(removePostFailure(error.message));
  }
}

export default function* postsSaga() {
  yield takeLatest(fetchPostsRequest.type, handleFetchPosts);
  yield takeLatest(createPostRequest.type, handleCreatePost);
  yield takeLatest(removePostRequest.type, handleRemovePost);
}
