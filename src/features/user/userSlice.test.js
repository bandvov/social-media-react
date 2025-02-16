import profileReducer, { fetchUserProfileFailure, fetchUserProfileRequest, fetchUserProfileSuccess, fetchUsersFailure, fetchUsersRequest, fetchUsersSuccess, initialState, setInitialUserState, updateUserFailure, updateUserRequest, updateUserSuccess } from './userSlice'

describe("profileSlice reducer", () => {
  it("should return the initial state", () => {
    expect(profileReducer(undefined, {})).toMatchObject(initialState);
  });

  it("should handle fetchUserProfileRequest", () => {
    const nextState = profileReducer(initialState, fetchUserProfileRequest());
    expect(nextState.loading.fetchUserProfile).toBe(true);
    expect(nextState.errors.fetchUserProfile).toBe(false);
  });

  it("should handle fetchUserProfileSuccess", () => {
    const payload = { id: 1, username: "test_user" };
    const nextState = profileReducer(initialState, fetchUserProfileSuccess(payload));
    expect(nextState.loading.fetchUserProfile).toBe(false);
    expect(nextState.profile).toEqual(payload);
  });

  it("should handle fetchUserProfileFailure", () => {
    const payload = "Error fetching profile";
    const nextState = profileReducer(initialState, fetchUserProfileFailure(payload));
    expect(nextState.loading.fetchUserProfile).toBe(false);
    expect(nextState.errors.fetchUserProfile).toBe(payload);
  });

  it("should handle updateUserRequest", () => {
    const nextState = profileReducer(initialState, updateUserRequest());
    expect(nextState.loading.updateUser).toBe(true);
  });

  it("should handle updateUserSuccess", () => {
    const nextState = profileReducer(initialState, updateUserSuccess());
    expect(nextState.loading.updateUser).toBe(false);
  });

  it("should handle updateUserFailure", () => {
    const payload = "Update failed";
    const nextState = profileReducer(initialState, updateUserFailure(payload));
    expect(nextState.loading.updateUser).toBe(false);
    expect(nextState.errors.updateUser).toBe(payload);
  });

  it("should handle fetchUsersRequest", () => {
    const nextState = profileReducer(initialState, fetchUsersRequest());
    expect(nextState.loading.fetchUsers).toBe(true);
    expect(nextState.errors.fetchUsers).toBe(null);
  });

  it("should handle fetchUsersSuccess", () => {
    const payload = {
      total: 5,
      data: [{ id: 4, email: "new@user.com", username: "newUser", role: "user" }],
    };
    const nextState = profileReducer(initialState, fetchUsersSuccess(payload));
    expect(nextState.loading.fetchUsers).toBe(false);
    expect(nextState.total).toBe(payload.total);
    expect(nextState.data).toEqual([...initialState.data, ...payload.data]);
  });

  it("should handle fetchUsersFailure", () => {
    const payload = "Failed to fetch users";
    const nextState = profileReducer(initialState, fetchUsersFailure(payload));
    expect(nextState.loading.fetchUsers).toBe(false);
    expect(nextState.errors.fetchUsers).toBe(payload);
  });

  it("should handle setInitialUserState", () => {
    const nextState = profileReducer(initialState, setInitialUserState());
    expect(nextState.profile).toEqual({});
  });
});
