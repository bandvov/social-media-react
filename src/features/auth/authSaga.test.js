import { runSaga } from "redux-saga";
import { loginRequest, success, failure, registrationRequest, logoutRequest } from "./authSlice";
import { login, Logout, registration } from "./authApi";
import {
  handleLogin,
  handleRegistration,
  handleLogout,
} from "./authSaga";

// Mock API functions
jest.mock("./authApi", () => ({
  login: jest.fn(),
  Logout: jest.fn(),
  registration: jest.fn(),
}));

describe("authSaga", () => {
  it("should handle login successfully", async () => {
    const dispatched = [];
    const mockUser = { data: { id: 1, name: "John Doe" } };
    login.mockResolvedValue(mockUser);

    // Spy on localStorage.setItem
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});

    const action = loginRequest({ username: "test", password: "password" });
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      handleLogin,
      action
    ).toPromise();

    expect(dispatched).toEqual([success(mockUser.data)]);
    expect(setItemSpy).toHaveBeenCalledWith('userId',
      JSON.stringify( mockUser.data.id )
    );

    // Clean up spy after the test
    setItemSpy.mockRestore();
  });

    it('should handle login failure', async () => {
      const dispatched = [];
      const errorMessage = 'Login failed';
      login.mockRejectedValue(new Error(errorMessage));

      const action = loginRequest({ username: 'test', password: 'password' });
      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
        },
        handleLogin,
        action
      ).toPromise();

      expect(dispatched).toEqual([failure(errorMessage)]);
    });

    it('should handle registration successfully', async () => {
      const dispatched = [];
      registration.mockResolvedValue();

      const action = registrationRequest({ username: 'test', password: 'password' });
      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
        },
        handleRegistration,
        action
      ).toPromise();

      expect(dispatched).toEqual([]); // Expect no error
    });

    it('should handle registration failure', async () => {
      const dispatched = [];
      const errorMessage = 'Registration failed';
      registration.mockRejectedValue(new Error(errorMessage));

      const action = registrationRequest({ username: 'test', password: 'password' });
      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
        },
        handleRegistration,
        action
      ).toPromise();

      expect(dispatched).toEqual( [failure(errorMessage)]);
    });

    it('should handle logout successfully', async () => {
      const dispatched = [];
      Logout.mockResolvedValue();

      const action = logoutRequest();
      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
        },
        handleLogout,
        action
      ).toPromise();

      expect(dispatched).toEqual([success(null)]);
    });

    it('should handle logout failure', async () => {
      const dispatched = [];
      const errorMessage = 'Logout failed';
      Logout.mockRejectedValue(new Error(errorMessage));

      const action = logoutRequest();
      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
        },
        handleLogout,
        action
      ).toPromise();

      expect(dispatched).toEqual([failure(errorMessage)]);
    });
});
