// src/sagas.js
import { takeEvery, put, call, select } from "redux-saga/effects";
import {
  fetchNotificationsStart,
  fetchNotificationsSuccess,
  fetchNotificationsFailure,
} from "./notificationsSlice";
import { fetchNotifications } from "./notificationsApi";

function* handleFetchNotifications(action) {
  try {
    const { page } = yield select((state) => state.notifications);

    const res = yield call(fetchNotifications, {
      page,
      ...action.payload,
    });

    yield put(
      fetchNotificationsSuccess({
        data: res.data.data,
        hasMore: res.data.hasMore,
      })
    );
  } catch (error) {
    yield put(fetchNotificationsFailure(error.message));
  }
}

export default function* notificationsSaga() {
  yield takeEvery(fetchNotificationsStart.type, handleFetchNotifications);
}
