import { takeLatest, call, put } from 'redux-saga/effects';
import { loginRequest, success, failure, registrationRequest } from './authSlice';
import * as authApi from './authApi';

function* handleLogin(action) {
  try {
    // clear error message
    yield put(failure(""))   
    const user = yield call(authApi.login, action.payload);
    yield put(success(user));
  } catch (error) {
    yield put(failure(error.message));
  }
}
function* handleRegistration(action) {
  try {
    // clear error message
    yield put(failure(""))   
    yield call(authApi.registration, action.payload);
  } catch (error) {
    yield put(failure(error.message));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(registrationRequest.type, handleRegistration);
}
