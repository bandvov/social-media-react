import { call, put, takeLatest } from "redux-saga/effects";
import {
  failure,
  fetchProfilePostsfailure,
  fetchProfilePostsRequest,
  fetchProfilePostssuccess,
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
function* handleFetchfofilePosts(action) {
  try {
    // clear error message
    yield put(fetchProfilePostsfailure(""));
    const user = yield call(fetch, action.payload);
    yield put(fetchProfilePostssuccess(user.data));
  } catch (error) {
    yield put(fetchProfilePostsfailure(error.message));
  }
}

export default function* profileSaga() {
  yield takeLatest(fetchProfileRequest.type, handlePfofileInfo);
  yield takeLatest(updateProfileRequest.type, handleUpdatePfofile);
  yield takeLatest(fetchProfilePostsRequest.type, handleFetchfofilePosts);
}
