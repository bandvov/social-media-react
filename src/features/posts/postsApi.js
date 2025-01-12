import { api } from "../api";

export async function fetchPosts( params) {
  return await api.get(`/posts`, {
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

export async function fetchUserPosts({userId, ...params}) {
  return await api.get(`/users/${userId}/posts`, {
    params,
    withCredentials: true,
  });
}
