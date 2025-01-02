import { call, put, takeLatest } from "redux-saga/effects";
import { failure, profileRequest } from "./profileSlice";
import { fetchProfileInfo } from "./profileApi";

function* handlePfofileInfo(action) {
  try {
    // clear error message
    yield put(failure(""))   
    yield call(fetchProfileInfo, action.payload);
  } catch (error) {
    yield put(failure(error.message));
  }
}

export default function* profileSaga() {
  yield takeLatest(profileRequest.type, handlePfofileInfo);
}
