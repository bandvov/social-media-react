import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchUserProfileFailure,
  fetchUserProfileRequest,
  fetchUserProfileSuccess,
  updateUserFailure,
  updateUserRequest,
} from "./userSlice";
import { fetchUserProfile, updateUser } from "./userApi";

function* handleFetchUserPfofile(action) {
  try {
    const user = yield call(fetchUserProfile, action.payload);
    yield put(fetchUserProfileSuccess(user?.data));
  } catch (error) {
    yield put(fetchUserProfileFailure(error.message));
  }
}
function* handleUpdateUser(action) {
  try {
    yield call(updateUser, action.payload);
    yield put(fetchUserProfileRequest(action.payload.userId));
  } catch (error) {
    yield put(updateUserFailure(error.message));
  }
}

export default function* userSaga() {
  yield takeLatest(fetchUserProfileRequest.type, handleFetchUserPfofile);
  yield takeLatest(updateUserRequest.type, handleUpdateUser);
}
