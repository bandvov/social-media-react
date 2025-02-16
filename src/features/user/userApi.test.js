import { api } from "../api";
import { fetchUserProfile, fetchUsers, updateUser } from "./userApi";

jest.mock("../api", () => ({
  api: {
    get: jest.fn(),
    put: jest.fn(),
  },
}));

describe("users API functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetchUserProfile calls api.get with correct URL", async () => {
    const mockData = { id: 1, email: "test@test.aaa" };
    api.get.mockResolvedValueOnce({ data: mockData });

    const userId = 1;
    const response = await fetchUserProfile(userId);

    expect(api.get).toHaveBeenCalledWith(`/users/${userId}/profile`);
    expect(response.data).toEqual(mockData);
  });

  test("updateUser calls api.put with correct parameters", async () => {
    const mockData = { success: true };
    api.put.mockResolvedValueOnce({ data: mockData });

    const userId = 1;
    const data = { name: "New Name" };
    const response = await updateUser({ userId, data });

    expect(api.put).toHaveBeenCalledWith(`/users/${userId}`, { data });
    expect(response.data).toEqual(mockData);
  });

  test("fetchUsers calls api.get with correct params", async () => {
    const mockUsers = [{ id: 1, name: "User1" }, { id: 2, name: "User2" }];
    api.get.mockResolvedValueOnce({ data: mockUsers });

    const params = { page: 1, limit: 10 };
    const response = await fetchUsers(params);

    expect(api.get).toHaveBeenCalledWith("/users", { params });
    expect(response.data).toEqual(mockUsers);
  });
});
