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

function* handleFetchFollowers(action) {
  try {
    const { page } = yield select((state) => state.followers);
    const data = yield call(fetchFollowers, { page, ...action.payload });
    yield put(
      fetchFollowersSuccess({
        followers: data.followers,
        nextPage: page + 1,
        hasMore: data.hasMore,
      })
    );
  } catch (error) {
    yield put(fetchFollowersFailure(error.message));
  }
}
function* handleRemoveFollower(action) {
  try {
    yield call(removeFollower, action.payload);
    yield put(removeFollowerSuccess(action.payload));
  } catch (error) {
    yield put(removeFollowerFailure(error.message));
  }
}

export default function* followersSaga() {
  yield takeLatest(fetchFollowersRequest.type, handleFetchFollowers);
  yield takeLatest(removeFollowerRequest.type, handleRemoveFollower);
}
