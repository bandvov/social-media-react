import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  addCommentRequest,
  addCommentSuccess,
  addCommentFailure,
  fetchCommentsRequest,
  fetchCommentsFailure,
  fetchCommentsSuccess,
} from "./commentsSlice";
import { addComment, fetchComments } from "./commentsApi";

function* handleAddComment(action) {
  try {
    const response = yield call(addComment, action.payload);
    yield put(addCommentSuccess( {entity_id: action.payload.entity_id, data: response.data}));
  } catch (error) {
    yield put(addCommentFailure(error.message));
  }
}

function* handleFetchComments(action) {
  try {
    const { page } = yield select((state) => state.comments);
    const res = yield call(fetchComments, { page, ...action.payload });
    console.log({res, action});
    
    yield put(
      fetchCommentsSuccess({
        entity_id: action.payload.entity_id,
        data: res.data.data,
        hasMore: res.data.hasMore,
      })
    );
  } catch (error) {
    yield put(fetchCommentsFailure(error.message));
  }
}

export function* commentsSaga() {
  yield takeLatest(addCommentRequest.type, handleAddComment);
  yield takeLatest(fetchCommentsRequest.type, handleFetchComments);
}
