import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  fetchUserPostsFailure,
  fetchUserPostsRequest,
  fetchUserPostsSuccess,
  fetchPostsFailure,
  fetchPostsRequest,
  fetchPostsSuccess,
  removePostFailure,
  removePostRequest,
  removePostSuccess,
  createPostFailure,
  createPostRequest,
  createPostSuccess,
  addReactionFailure,
  addReactionRequest,
  addReactionSuccess,
  removeReactionFailure,
  removeReactionRequest,
  removeReactionSuccess,
} from "./postsSlice";
import {
  addReaction,
  createPost,
  fetchPosts,
  fetchUserPosts,
  removePost,
  removeReaction,
} from "./postsApi";

export function* handleFetchPosts(action) {
  try {
    const { page } = yield select((state) => state.post);
    const res = yield call(fetchPosts, { page, ...action.payload });
    yield put(
      fetchPostsSuccess({
        data: res.data.data,
        hasMore: res.data.hasMore,
      })
    );
  } catch (error) {
    yield put(fetchPostsFailure(error.message));
  }
}

export function* handleCreatePost(action) {
  try {
    // clear error message
    yield call(createPost, action.payload);
    yield put(createPostSuccess(action.payload));
  } catch (error) {
    yield put(createPostFailure(error.message));
  }
}
export function* handleRemovePost(action) {
  try {
    // clear error message
    yield call(removePost, action.payload);
    yield put(removePostSuccess(action.payload));
  } catch (error) {
    yield put(removePostFailure(error.message));
  }
}

export function* handleFetchUserPosts(action) {
  try {
    const { page } = yield select((state) => state.post);
    const res = yield call(fetchUserPosts, { page, ...action.payload });
    yield put(
      fetchUserPostsSuccess({
        data: res.data.data,
        hasMore: res.data.hasMore,
      })
    );
  } catch (error) {
    yield put(fetchUserPostsFailure(error.message));
  }
}

export function* handleAddReaction(action) {
  try {
    yield call(addReaction, action.payload);
    yield put(addReactionRequest(action.payload));
  } catch (error) {
    yield put(addReactionFailure(error.message));
  }
}
export function* handleRemoveReaction(action) {
  try {
    yield call(removeReaction, action.payload);
    yield put(removeReactionSuccess(action.payload));
  } catch (error) {
    yield put(removeReactionFailure(error.message));
  }
}

export default function* postsSaga() {
  yield takeLatest(fetchPostsRequest.type, handleFetchPosts);
  yield takeLatest(createPostRequest.type, handleCreatePost);
  yield takeLatest(removePostRequest.type, handleRemovePost);
  yield takeLatest(fetchUserPostsRequest.type, handleFetchUserPosts);
  yield takeLatest(addReactionRequest.type, handleAddReaction);
  yield takeLatest(removePostRequest.type, handleRemoveReaction);
}
