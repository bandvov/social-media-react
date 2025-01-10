import { api } from "../api";

export async function fetchUserProfile(userId) {
  return await api.get(`/users/${userId}/profile`, { withCredentials: true });
}
export async function updateUser({ userId, data }) {
  return await api.put(`/users/${userId}`, data, {
    withCredentials: true,
  });
}
