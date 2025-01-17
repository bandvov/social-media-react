import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  fetchFolloweesFailure,
  fetchFolloweesRequest,
  fetchFolloweesSuccess,
  removeFolloweeFailure,removeFolloweeRequest,removeFolloweeSuccess
} from "./followeesSlice";
import { fetchFollowees, removeFollowee } from "./followeesApi";

function* handleFetchFollowees(action) {
  try {
    const { page } = yield select((state) => state.followers);
    const res = yield call(fetchFollowees, { page, ...action.payload });
    yield put(
      fetchFolloweesSuccess({
        data: res.data,
        nextPage: page + 1,
        hasMore: res.hasMore,
      }),
    );
  } catch (error) {
    yield put(fetchFolloweesFailure(error.message));
  }
}

function* handleRemoveFollowee(action) {
  try {
    yield call(removeFollowee, action.payload);
    yield put(removeFolloweeSuccess(action.payload));
  } catch (error) {
    yield put(removeFolloweeFailure(error.message));
  }
}

export default function* followeesSaga() {
  yield takeLatest(fetchFolloweesRequest.type, handleFetchFollowees);
  yield takeLatest(removeFolloweeRequest.type, handleRemoveFollowee);
}
