import followersReducer,{ fetchFollowersFailure, fetchFollowersRequest, fetchFollowersSuccess, initialState, removeFollowerFailure, removeFollowerRequest, removeFollowerSuccess, setInitialFollowersState } from "./followersSlice";

describe("followersSlice reducer", () => {
  it("should return the initial state when passed an unknown action", () => {
    expect(followersReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle fetchFollowersRequest", () => {
    const state = followersReducer(initialState, fetchFollowersRequest());
    expect(state.loading.fetchFollowers).toBe(true);
    expect(state.errors.fetchFollowers).toBe(false);
  });

  it("should handle fetchFollowersSuccess", () => {
    const payload = { data: [{ id: 1, name: "John" }], hasMore: false };
    const state = followersReducer(initialState, fetchFollowersSuccess(payload));
    expect(state.loading.fetchFollowers).toBe(false);
    expect(state.data).toEqual(payload.data);
    expect(state.hasMore).toBe(false);
    expect(state.page).toBe(2);
  });

  it("should handle fetchFollowersFailure", () => {
    const error = "Error fetching followers";
    const state = followersReducer(initialState, fetchFollowersFailure(error));
    expect(state.loading.fetchFollowers).toBe(false);
    expect(state.errors.fetchFollowers).toBe(error);
  });

  it("should handle removeFollowerRequest", () => {
    const state = followersReducer(initialState, removeFollowerRequest());
    expect(state.loading.removeFollower).toBe(true);
    expect(state.errors.removeFollower).toBe(false);
  });

  it("should handle removeFollowerSuccess", () => {
    const prevState = { ...initialState, data: [{ id: 1, name: "John" }, { id: 2, name: "Jane" }] };
    const state = followersReducer(prevState, removeFollowerSuccess(1));
    expect(state.loading.removeFollower).toBe(false);
    expect(state.data).toEqual([{ id: 2, name: "Jane" }]);
  });

  it("should handle removeFollowerFailure", () => {
    const error = "Error removing follower";
    const state = followersReducer(initialState, removeFollowerFailure(error));
    expect(state.loading.removeFollower).toBe(false);
    expect(state.errors.removeFollower).toBe(error);
  });

  it("should handle setInitialFollowersState", () => {
    const modifiedState = { ...initialState, data: [{ id: 1, name: "John" }], page: 3 };
    const state = followersReducer(modifiedState, setInitialFollowersState());
    expect(state).toEqual(modifiedState);
  });
});
