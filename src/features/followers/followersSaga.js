import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  fetchFollowersRequest,
  fetchFollowersSuccess,
  fetchFollowersFailure,
} from "./followersSlice";

function* fetchFollowers() {
  try {
    const { page } = yield select((state) => state.followers);
    const data = yield call(fetchFollowers, page);
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

export default function* followersSaga() {
  yield takeLatest(fetchFollowersRequest.type, fetchFollowers);
}
