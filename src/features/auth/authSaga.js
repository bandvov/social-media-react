import { takeLatest, call, put } from "redux-saga/effects";
import {
  loginRequest,
  success,
  failure,
  registrationRequest,
  logoutRequest,
} from "./authSlice";
import { login, Logout, registration } from "./authApi";
export function* handleLogin(action) {
  try {
    // clear error message
    const user = yield call(login, action.payload);
    localStorage.setItem("userId", JSON.stringify(user?.data?.id));
    yield put(success(user?.data));
  } catch (error) {
    yield put(failure(error.message));
  }
}
export function* handleRegistration(action) {
  try {
    yield call(registration, action.payload);
  } catch (error) {
    yield put(failure(error.message));
  }
}
export function* handleLogout(action) {
  try {
    // clear error message
    yield call(Logout);
    yield put(success(null));
  } catch (error) {
    yield put(failure(error.message));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(logoutRequest.type, handleLogout);
  yield takeLatest(registrationRequest.type, handleRegistration);
}
