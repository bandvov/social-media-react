import { call, put, takeLatest } from "redux-saga/effects";
import {
  addCommentRequest,
  addCommentSuccess,
  addCommentFailure,
} from "./commentsSlice";
import { addComment } from "./commentsApi";

function* handleAddComment(action) {
  try {
    const response = yield call(addComment, action.payload);
    yield put(addCommentSuccess(response.data));
  } catch (error) {
    yield put(addCommentFailure(error.message));
  }
}

export function* commentsSaga() {
  yield takeLatest(addCommentRequest.type, handleAddComment);
}
