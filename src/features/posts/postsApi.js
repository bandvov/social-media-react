import { api } from "../api";

export async function fetchPosts(params) {
  return await api.get(`/posts`, {
    params,
  });
}
export async function createPost(postData) {
  return await api.post("/posts", { data: postData });
}
export async function removePost(postId) {
  return await api.delete(`/posts/${postId}`);
}

export async function fetchUserPosts({ userId, ...params }) {
  return await api.get(`/users/${userId}/posts`, {
    params,
  });
}
export async function addReaction(params) {
  return await api.get(`/reaction`, { params });
}
export async function removeReaction(params) {
  return await api.delete(`/reaction`, { params });
}
