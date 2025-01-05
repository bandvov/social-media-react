import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  fetchFolloweesFailure,
  fetchFolloweesRequest,
  fetchFolloweesSuccess,
} from "./followeesSlice";
import { fetchFollowees } from "./followeesApi";

function* handleFetchFollowees(action) {
  try {
    const { page } = yield select((state) => state.followers);
    const data = yield call(fetchFollowees, { page, ...action.payload });
    yield put(
      fetchFolloweesSuccess({
        followers: data.followers,
        nextPage: page + 1,
        hasMore: data.hasMore,
      })
    );
  } catch (error) {
    yield put(fetchFolloweesFailure(error.message));
  }
}

export default function* followeesSaga() {
  yield takeLatest(fetchFolloweesRequest.type, handleFetchFollowees);
}
