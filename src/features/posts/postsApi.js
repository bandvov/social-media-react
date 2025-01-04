import { api } from "../api";

export async function fetchPosts(userId, params) {
  return await api.get(`/posts/${userId}`, {
    params,
    mwithCredentials: true,
  });
}
