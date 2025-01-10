import { api } from "../api";

export async function fetchPosts(userId, params) {
  return await api.get(`/posts/${userId}`, {
    params,
    withCredentials: true,
  });
}
export async function createPost(postData) {
  return await api.post("/posts", postData, { withCredentials: true });
}
export async function removePost(postId) {
  return await api.delete(`/posts/${postId}`, {
    withCredentials: true,
  });
}

export async function fetchUserPosts(userId, data) {
  return await api.get(`/users/${userId}/posts`, data, {
    withCredentials: true,
  });
}
