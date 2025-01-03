import { call, put, takeLatest } from "redux-saga/effects";
import { failure, profileRequest, success } from "./profileSlice";
import { fetchProfileInfo } from "./profileApi";

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

export default function* profileSaga() {
  yield takeLatest(profileRequest.type, handlePfofileInfo);
}
