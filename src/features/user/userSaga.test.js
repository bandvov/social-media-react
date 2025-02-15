import { runSaga } from "redux-saga";
import {
  fetchUserProfileFailure,
  fetchUserProfileRequest,
  fetchUserProfileSuccess,
  updateUserFailure,
  updateUserRequest,
  fetchUsersFailure,
  fetchUsersRequest,
  fetchUsersSuccess,
} from "./userSlice";
import {
  handleFetchUserProfile,
  handleFetchUsers,
  handleUpdateUser,
} from "./userSaga";
import { fetchUserProfile, fetchUsers, updateUser } from "./userApi";

jest.mock("./userApi");

describe("User Sagas", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should handle fetch user profile success", async () => {
    const user = { id: 1, email: "test@test.com" };
    fetchUserProfile.mockResolvedValue({ data: user });
    
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      handleFetchUserProfile,
      { payload: 1 }
    ).toPromise();
    
    expect(dispatched).toEqual([
      fetchUserProfileSuccess(user),
    ]);
  });

  it("should handle fetch user profile failure", async () => {
    fetchUserProfile.mockRejectedValue(new Error("API error"));
    
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
     handleFetchUserProfile,
      { payload: 1 }
    ).toPromise();
    
    expect(dispatched).toEqual([
      fetchUserProfileFailure("API error"),
    ]);
  });

  it("should handle fetch users success", async () => {
    const users = [{ id: 1, email: "user1@test.com" }];
    fetchUsers.mockResolvedValue( {data:users, total: 1});
    
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      handleFetchUsers,
      { }
    ).toPromise();
    
    expect(dispatched).toEqual([
      fetchUsersSuccess({data: users, total: 1 }),
    ]);
  });

  it("should handle fetch users failure", async () => {
    fetchUsers.mockRejectedValue(new Error("API error"));
    
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      handleFetchUsers,
      { payload: {} }
    ).toPromise();
    
    expect(dispatched).toEqual([
      fetchUsersFailure("API error"),
    ]);
  });

  it("should handle update user request", async () => {
    updateUser.mockResolvedValue({});
    
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      handleUpdateUser,
      { payload: { userId: 1, data: { email: "updated@test.com" } } }
    ).toPromise();
    
    expect(dispatched).toEqual([
      fetchUserProfileRequest(1),
    ]);
  });

  it("should handle update user failure", async () => {
    updateUser.mockRejectedValue(new Error("Update failed"));
    
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      handleUpdateUser,
      { payload: { userId: 1, data: { email: "updated@test.com" } } }
    ).toPromise();
    
    expect(dispatched).toEqual([
      updateUserFailure("Update failed"),
    ]);
  });
});
