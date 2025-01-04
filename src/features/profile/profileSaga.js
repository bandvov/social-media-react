import { call, put, takeLatest } from "redux-saga/effects";
import {
  failure,
  fetchProfileRequest,
  success,
  updateProfileRequest,
} from "./profileSlice";
import { fetchProfileInfo, fetchUpdateProfile } from "./profileApi";

function* handlePfofileInfo(action) {
  try {
    // clear error message
    yield put(failure(""));
    const user = yield call(fetchProfileInfo, action.payload);
    yield put(success(user.data));
  } catch (error) {
    yield put(failure(error.message));
  }
}
function* handleUpdatePfofile(action) {
  try {
    // clear error message
    yield put(failure(""));
    const user = yield call(fetchUpdateProfile, action.payload);
    yield put(success(user.data));
  } catch (error) {
    yield put(failure(error.message));
  }
}

export default function* profileSaga() {
  yield takeLatest(fetchProfileRequest.type, handlePfofileInfo);
  yield takeLatest(updateProfileRequest.type, handleUpdatePfofile);
}
