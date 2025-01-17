import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchUserProfileFailure,
  fetchUserProfileRequest,
  fetchUserProfileSuccess,
  updateUserFailure,
  updateUserRequest,
  fetchUsersFailure,
  fetchUsersRequest,
  fetchUsersSuccess
} from "./userSlice";
import { fetchUserProfile, fetchUsers, updateUser } from "./userApi";

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
function* handleFetchUsers(action) {
  try {
    const response = yield call(fetchUsers, action.payload);
    yield put(fetchUsersSuccess({ users: response.data, total: response.data.total }));
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}

export default function* userSaga() {
  yield takeLatest(fetchUserProfileRequest.type, handleFetchUserPfofile);
  yield takeLatest(fetchUsersRequest.type, handleFetchUsers)
  yield takeLatest(updateUserRequest.type, handleUpdateUser);
}
