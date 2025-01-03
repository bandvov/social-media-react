import { api } from "../api";

export async function fetchPosts({ userId, page }) {
  return await api.get(`/users/${userId}/posts`, {
    params: {
      page,
    },
    mwithCredentials: true,
  });
}
