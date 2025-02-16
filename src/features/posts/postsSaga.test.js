import { runSaga } from "redux-saga";
import {
  addReaction,
  createPost,
  fetchPosts,
  fetchUserPosts,
  removePost,
  removeReaction,
} from "./postsApi";
import {
  handleAddReaction,
  handleCreatePost,
  handleFetchPosts,
  handleFetchUserPosts,
  handleRemovePost,
  handleRemoveReaction,
} from "./postsSaga";
import {
    addReactionFailure,
  addReactionRequest,
  createPostFailure,
  createPostSuccess,
  fetchPostsFailure,
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchUserPostsFailure,
  fetchUserPostsSuccess,
  removePostFailure,
  removePostSuccess,
  removeReactionFailure,
  removeReactionSuccess,
} from "./postsSlice";
jest.mock("./postsApi");

describe("Posts Saga Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("should handle fetch posts saga", async () => {
    const dispatched = [];
    const fakePosts = { data: { data: [], hasMore: false } };
    fetchPosts.mockResolvedValue(fakePosts);

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ post: { page: 1 } }),
      },
      handleFetchPosts,
      { payload: {} }
    ).toPromise();

    expect(dispatched).toContainEqual(fetchPostsSuccess(fakePosts.data));
  });

  test("should handle create post saga", async () => {
    const dispatched = [];
    const payload = { title: "Test Post" };
    createPost.mockResolvedValue({});

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      handleCreatePost,
      { payload }
    ).toPromise();

    expect(dispatched).toContainEqual(createPostSuccess(payload));
  });

  test("should handle remove post saga", async () => {
    const dispatched = [];
    const payload = { id: 1 };
    removePost.mockResolvedValue({});

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      handleRemovePost,
      { payload }
    ).toPromise();

    expect(dispatched).toContainEqual(removePostSuccess(payload));
  });

  test("should handle fetch user posts saga", async () => {
    const dispatched = [];
    const fakePosts = { data: { data: [], hasMore: false } };
    fetchUserPosts.mockResolvedValue(fakePosts);

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ post: { page: 1 } }),
      },
      handleFetchUserPosts,
      { payload: {} }
    ).toPromise();

    expect(dispatched).toContainEqual(fetchUserPostsSuccess(fakePosts.data));
  });

  test("should handle add reaction saga", async () => {
    const dispatched = [];
    const payload = { postId: 1, reaction: "like" };
    addReaction.mockResolvedValue({});

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      handleAddReaction,
      { payload }
    ).toPromise();

    expect(dispatched).toContainEqual(addReactionRequest(payload));
  });

  test("should handle remove reaction saga", async () => {
    const dispatched = [];
    const payload = { postId: 1 };
    removeReaction.mockResolvedValue({});

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      handleRemoveReaction,
      { payload }
    ).toPromise();

    expect(dispatched).toContainEqual(removeReactionSuccess(payload));
  });

  it("should handle fetch posts failure", async () => {
    fetchPosts.mockRejectedValue(new Error("API error"));

    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ post: { page: 1 } }),
      },
      handleFetchPosts,
      fetchPostsRequest()
    ).toPromise();
    expect(dispatched).toEqual([fetchPostsFailure("API error")]);
  });

  it("should handle create post failure", async () => {
    createPost.mockRejectedValue(new Error("API error"));

    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      handleCreatePost,
      { payload: { content: "test" } }
    ).toPromise();
    expect(dispatched).toEqual([createPostFailure("API error")]);
  });

  it("should handle remove post failure", async () => {
    removePost.mockRejectedValue(new Error("API error"));

    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      handleRemovePost,
      { payload: { id: 1 } }
    ).toPromise();
    expect(dispatched).toEqual([removePostFailure("API error")]);
  });

  it("should handle fetch user posts failure", async () => {
    fetchUserPosts.mockRejectedValue(new Error("API error"));

    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ post: { page: 1 } }),
      },
      handleFetchUserPosts,
      { payload: {} }
    ).toPromise();
    expect(dispatched).toEqual([fetchUserPostsFailure("API error")]);
  });

  it("should handle add reaction failure", async () => {
    addReaction.mockRejectedValue(new Error("API error"));

    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      handleAddReaction,
      { payload: { id: 1 } }
    ).toPromise();
    expect(dispatched).toEqual([addReactionFailure("API error")]);
  });

  it("should handle remove reaction failure", async () => {
    removeReaction.mockRejectedValue(new Error("API error"));

    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      handleRemoveReaction,
      { payload: { id: 1 } }
    ).toPromise();
    expect(dispatched).toEqual([removeReactionFailure("API error")]);
  });
  
});
