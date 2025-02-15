import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ProfileInfo from "./ProfileInfo";
import {
  fetchUserProfileRequest,
  setInitialUserState,
} from "../features/user/userSlice";
import { removeFollowerRequest } from "../features/followers/followersSlice";
import "@testing-library/jest-dom";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key, // Mock translation function
  }),
}));

jest.mock("react-router-dom", () => ({
  Link: ({ children }) => <div>{children}</div>,
  useParams: () => ({ userId: "1" }),
  useNavigate: jest.fn(),
}));
// Mock Redux
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Mock Dispatch Function
const mockDispatch = jest.fn();

describe("ProfileInfo Component", () => {
  let store;
  const mockStore = configureStore([]);

  beforeEach(() => {
    store = mockStore({
      user: {
        profile: {
          id: 1,
          email: "test@example.com",
          posts_count: 5,
          profile_pic: "https://via.placeholder.com/64",
          followees_count: 10,
          followers_count: 8,
          created_at: "2024-01-01T00:00:00Z",
          bio: "Test Bio",
          is_follower: true,
          is_followee: false,
        },
      },
      auth: { user: { id: 2 } },
    });

    jest
      .spyOn(require("react-redux"), "useDispatch")
      .mockReturnValue(mockDispatch);
    jest
      .spyOn(require("react-redux"), "useSelector")
      .mockImplementation((callback) => {
        return callback(store.getState());
      });
  });

  test("renders user profile data correctly", () => {
    const { container } = render(
      <Provider store={store}>
        <ProfileInfo userId={1} />
      </Provider>
    );

    expect(container).toMatchSnapshot();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByText(/Joined:/)).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("Bio: Test Bio")).toBeInTheDocument();
  });

  test("dispatches actions on mount", () => {
    render(
      <Provider store={store}>
        <ProfileInfo userId={1} />
      </Provider>
    );

    expect(mockDispatch).toHaveBeenCalledWith(setInitialUserState());
    expect(mockDispatch).toHaveBeenCalledWith(fetchUserProfileRequest(1));
  });

  test("opens and closes menu", () => {
    render(
      <Provider store={store}>
        <ProfileInfo userId={1} />
      </Provider>
    );

    const menuButton = screen.getByRole("button");
    fireEvent.click(menuButton);

    expect(screen.getByText("unfollow")).toBeInTheDocument();

    fireEvent.click(screen.getByText("unfollow"));

    expect(mockDispatch).toHaveBeenCalledWith(removeFollowerRequest(1));
  });
 
});
