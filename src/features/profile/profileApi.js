import { api } from "../api";

export async function fetchProfileInfo(userId) {
  return await api.get(`/users/${userId}/profile`, { withCredentials: true });
}
export async function fetchUpdateProfile(userId, data) {
  return await api.put(`/users/${userId}`, {
    data,
    withCredentials: true,
  });
}
export async function fetchProfilePosts(userId, data) {
  return await api.put(`/users/${userId}/posts`, {
    data,
    withCredentials: true,
  });
}
