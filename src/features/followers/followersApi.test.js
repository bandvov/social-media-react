import { fetchFollowers, removeFollower } from "./followersApi";
import { api } from "../api";

jest.mock("../api", () => ({
  api: {
    get: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("follower API calls", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch followers", async () => {
    const mockResponse = { data: ["follower1", "follower2"] };
    api.get.mockResolvedValue(mockResponse);

    const response = await fetchFollowers({ userId: 123, limit: 10 });

    expect(api.get).toHaveBeenCalledWith("/users/123/followers", {
      params: { limit: 10 },
    });
    expect(response).toEqual(mockResponse);
  });

  it("should remove follower", async () => {
    const mockResponse = { message: "Follower removed" };
    api.delete.mockResolvedValue(mockResponse);

    const response = await removeFollower(456);

    expect(api.delete).toHaveBeenCalledWith("/followers/456");
    expect(response).toEqual(mockResponse);
  });

  it("should handle errors in fetchFollowers", async () => {
    const errorMessage = "Something went wrong";
    api.get.mockRejectedValue(new Error(errorMessage));

    try {
      await fetchFollowers({ userId: 123, limit: 10 });
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });

  it("should handle errors in removeFollower", async () => {
    const errorMessage = "Something went wrong";
    api.delete.mockRejectedValue(new Error(errorMessage));

    try {
      await removeFollower(456);
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });
});
