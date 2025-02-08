// src/sagas.js
import { takeEvery, put, call, select } from "redux-saga/effects";
import {
  fetchNotificationsStart,
  fetchNotificationsSuccess,
  fetchNotificationsFailure,
} from "./notificationsSlice";
import { fetchNotifications } from "./notificationsApi";

function* handleFetchNotifications(action) {
  console.log("here");
  
  try {
     const { page } = yield select((state) => state.notifications);
     const user = yield select((state) => state.auth);

       const res = yield call(fetchNotifications, { page,user_id: user?.id??1, ...action.payload });
     console.log({res});
     
       yield put(
         fetchNotificationsSuccess({
           data: res.data.data,
           hasMore: res.data.hasMore,
         }),
       );
  } catch (error) {
    yield put(fetchNotificationsFailure(error.message));
  }
}

export default function* notificationsSaga() {
  yield takeEvery(fetchNotificationsStart.type, handleFetchNotifications);
}
