// src/sagas.js
import { takeEvery, put, call } from "redux-saga/effects";
import {
  fetchNotificationsStart,
  fetchNotificationsSuccess,
  fetchNotificationsFailure,
} from "./notificationsSlice";
import { fetchNotifications } from "./notificationsApi";

function* handleFetchNotifications() {
  try {
     const { page } = yield select((state) => state.notifications);
       const res = yield call(fetchNotifications, { page, ...action.payload });
       yield put(
         fetchNotificationsSuccess({
           data: res.data,
           hasMore: res.hasMore,
         }),
       );
  } catch (error) {
    yield put(fetchNotificationsFailure());
  }
}

export default function* notificationsSaga() {
  yield takeEvery(fetchNotificationsStart.type, handleFetchNotifications);
}
