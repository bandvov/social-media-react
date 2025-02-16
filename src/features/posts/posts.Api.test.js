import { fetchPosts, createPost, removePost, fetchUserPosts, addReaction, removeReaction } from "./postsApi"; // Adjust path accordingly
import { api } from "../api";

jest.mock("../api", () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("API functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetchPosts calls api.get with correct params", async () => {
    const params = { page: 1 };
    await fetchPosts(params);
    expect(api.get).toHaveBeenCalledWith("/posts", { params });
  });

  test("createPost calls api.post with correct data", async () => {
    const postData = { title: "Test Post" };
    await createPost(postData);
    expect(api.post).toHaveBeenCalledWith("/posts", { data: postData });
  });

  test("removePost calls api.delete with correct postId", async () => {
    const postId = 123;
    await removePost(postId);
    expect(api.delete).toHaveBeenCalledWith(`/posts/${postId}`);
  });

  test("fetchUserPosts calls api.get with correct params", async () => {
    const params = { userId: 456, page: 2 };
    await fetchUserPosts(params);
    expect(api.get).toHaveBeenCalledWith(`/users/456/posts`, { params: { page: 2 } });
  });

  test("addReaction calls api.get with correct params", async () => {
    const params = { postId: 789, reaction: "like" };
    await addReaction(params);
    expect(api.get).toHaveBeenCalledWith("/reaction", { params });
  });

  test("removeReaction calls api.delete with correct params", async () => {
    const params = { postId: 789, reaction: "like" };
    await removeReaction(params);
    expect(api.delete).toHaveBeenCalledWith("/reaction", { params });
  });
});
