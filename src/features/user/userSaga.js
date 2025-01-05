import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchUserPostsFailure,
  fetchUserPostsRequest,
  fetchUserPostsSuccess,
  fetchUserProfileFailure,
  fetchUserProfileRequest,
  fetchUserProfileSuccess,
  updateUserFailure,
  updateUserRequest,
  updateUserSuccess,
} from "./userSlice";
import { fetchUserPosts, fetchUserProfile, updateUser } from "./userApi";

function* handleFetchUserPfofile(action) {
  try {
    // clear error message
    const user = yield call(fetchUserProfile, action.payload);
    yield put(fetchUserProfileSuccess(user.data));
  } catch (error) {
    yield put(fetchUserProfileFailure(error.message));
  }
}
function* handleUpdateUser(action) {
  try {
    // clear error message
    const user = yield call(updateUser, action.payload);
    yield put(updateUserSuccess(user.data));
  } catch (error) {
    yield put(updateUserFailure(error.message));
  }
}
function* handleFetchUserPosts(action) {
  try {
    // clear error message
    const user = yield call(fetchUserPosts, action.payload);
    yield put(fetchUserPostsSuccess(user.data));
  } catch (error) {
    yield put(fetchUserPostsFailure(error.message));
  }
}

export default function* userSaga() {
  yield takeLatest(fetchUserProfileRequest.type, handleFetchUserPfofile);
  yield takeLatest(updateUserRequest.type, handleUpdateUser);
  yield takeLatest(fetchUserPostsRequest.type, handleFetchUserPosts);
}
