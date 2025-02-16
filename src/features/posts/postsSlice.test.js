import postsReducer, {
  initialState,
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsFailure,
  removePostRequest,
  removePostSuccess,
  removePostFailure,
  createPostRequest,
  createPostSuccess,
  createPostFailure,
  fetchUserPostsRequest,
  fetchUserPostsSuccess,
  fetchUserPostsFailure,
  addReactionRequest,
  addReactionSuccess,
  addReactionFailure,
  removeReactionRequest,
  removeReactionSuccess,
  removeReactionFailure,
  setInitialPostsState,
} from "./postsSlice";

describe("postsSlice", () => {
  it("should return the initial state when no action is passed", () => {
    expect(postsReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle fetchPostsRequest", () => {
    const nextState = postsReducer(initialState, fetchPostsRequest());
    expect(nextState.loading.fetchPosts).toBe(true);
    expect(nextState.errors.fetchPosts).toBe(false);
  });

  it("should handle fetchPostsSuccess", () => {
    const mockPayload = { data: [{ id: 1, content: "Test post" }], hasMore: true };
    const nextState = postsReducer(initialState, fetchPostsSuccess(mockPayload));
    expect(nextState.loading.fetchPosts).toBe(false);
    expect(nextState.data).toEqual(mockPayload.data);
    expect(nextState.hasMore).toBe(true);
    expect(nextState.page).toBe(2);
  });

  it("should handle fetchPostsFailure", () => {
    const mockError = "Error fetching posts";
    const nextState = postsReducer(initialState, fetchPostsFailure(mockError));
    expect(nextState.loading.fetchPosts).toBe(false);
    expect(nextState.errors.fetchPosts).toBe(mockError);
  });

  it("should handle removePostRequest", () => {
    const nextState = postsReducer(initialState, removePostRequest());
    expect(nextState.loading.removePost).toBe(true);
    expect(nextState.errors.removePost).toBe(false);
  });

  it("should handle removePostSuccess", () => {
    const mockPayload = 1;
    const mockInitialState = { ...initialState, data: [{ id: 1, content: "Test post" }] };
    const nextState = postsReducer(mockInitialState, removePostSuccess(mockPayload));
    expect(nextState.loading.removePost).toBe(false);
    expect(nextState.data).toEqual([]);
  });

  it("should handle removePostFailure", () => {
    const mockError = "Error removing post";
    const nextState = postsReducer(initialState, removePostFailure(mockError));
    expect(nextState.loading.removePost).toBe(false);
    expect(nextState.errors.removePost).toBe(mockError);
  });

  it("should handle createPostRequest", () => {
    const nextState = postsReducer(initialState, createPostRequest());
    expect(nextState.loading.createPost).toBe(true);
    expect(nextState.errors.createPost).toBe(false);
  });

  it("should handle createPostSuccess", () => {
    const mockPayload = { content: "New post" };
    const nextState = postsReducer(initialState, createPostSuccess(mockPayload));
    expect(nextState.loading.createPost).toBe(false);
    expect(nextState.data).toEqual([mockPayload]);
  });

  it("should handle createPostFailure", () => {
    const mockError = "Error creating post";
    const nextState = postsReducer(initialState, createPostFailure(mockError));
    expect(nextState.loading.createPost).toBe(false);
    expect(nextState.errors.createPost).toBe(mockError);
  });

  it("should handle fetchUserPostsRequest", () => {
    const nextState = postsReducer(initialState, fetchUserPostsRequest());
    expect(nextState.loading.fetchUserPosts).toBe(true);
    expect(nextState.errors.fetchUserPosts).toBe(false);
  });

  it("should handle fetchUserPostsSuccess", () => {
    const mockPayload = { data: [{ id: 1, content: "User post" }], hasMore: true };
    const nextState = postsReducer(initialState, fetchUserPostsSuccess(mockPayload));
    expect(nextState.loading.fetchUserPosts).toBe(false);
    expect(nextState.data).toEqual(mockPayload.data);
    expect(nextState.hasMore).toBe(true);
  });

  it("should handle fetchUserPostsFailure", () => {
    const mockError = "Error fetching user posts";
    const nextState = postsReducer(initialState, fetchUserPostsFailure(mockError));
    expect(nextState.loading.fetchUserPosts).toBe(false);
    expect(nextState.errors.fetchUserPosts).toBe(mockError);
  });

  it("should handle addReactionRequest", () => {
    const nextState = postsReducer(initialState, addReactionRequest());
    expect(nextState.loading.addReaction).toBe(true);
  });

  it("should handle addReactionSuccess", () => {
    const mockPayload = { entity_id: 1, reaction: "like" };
    const mockInitialState = { ...initialState, data: [{ id: 1, user_reaction: "" }] };
    const nextState = postsReducer(mockInitialState, addReactionSuccess(mockPayload));
    expect(nextState.loading.addReaction).toBe(false);
    expect(nextState.data[0].user_reaction).toBe("like");
  });

  it("should handle addReactionFailure", () => {
    const mockError = "Error adding reaction";
    const nextState = postsReducer(initialState, addReactionFailure(mockError));
    expect(nextState.loading.addReaction).toBe(false);
    expect(nextState.errors.addReaction).toBe(mockError);
  });

  it("should handle removeReactionRequest", () => {
    const nextState = postsReducer(initialState, removeReactionRequest());
    expect(nextState.loading.removeReaction).toBe(true);
  });

  it("should handle removeReactionSuccess", () => {
    const mockPayload = { entity_id: 1 };
    const mockInitialState = { ...initialState, data: [{ id: 1, user_reaction: "like" }] };
    const nextState = postsReducer(mockInitialState, removeReactionSuccess(mockPayload));
    expect(nextState.loading.removeReaction).toBe(false);
    expect(nextState.data[0].user_reaction).toBe("");
  });

  it("should handle removeReactionFailure", () => {
    const mockError = "Error removing reaction";
    const nextState = postsReducer(initialState, removeReactionFailure(mockError));
    expect(nextState.loading.removeReaction).toBe(false);
    expect(nextState.errors.removeReaction).toBe(mockError);
  });

  it("should handle setInitialPostsState", () => {
    const nextState = postsReducer(initialState, setInitialPostsState());
    expect(nextState).toEqual(initialState);
  });
});
