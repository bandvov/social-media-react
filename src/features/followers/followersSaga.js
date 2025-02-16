import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  fetchFollowersRequest,
  fetchFollowersSuccess,
  fetchFollowersFailure,
  removeFollowerFailure,
  removeFollowerRequest,
  removeFollowerSuccess,
} from "./followersSlice";
import { fetchFollowers, removeFollower } from "./followersApi";

export function* handleFetchFollowers(action) {
  try {
    const { page } = yield select((state) => state.followers);
    const res = yield call(fetchFollowers, { page, ...action.payload });
    yield put(
      fetchFollowersSuccess({
        data: res.data,
        hasMore: res.hasMore,
      }),
    );
  } catch (error) {
    yield put(fetchFollowersFailure(error.message));
  }
}
export function* handleRemoveFollower(action) {
  try {
    yield call(removeFollower, action.payload);
    yield put(removeFollowerSuccess());
  } catch (error) {
    yield put(removeFollowerFailure(error.message));
  }
}

export default function* followersSaga() {
  yield takeLatest(fetchFollowersRequest.type, handleFetchFollowers);
  yield takeLatest(removeFollowerRequest.type, handleRemoveFollower);
}
