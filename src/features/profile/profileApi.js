import { api } from "../api";

export async function fetchProfileInfo(userId) {
  return await api.get(`/users/${userId}/profile`, { withCredentials: true });
}
export async function fetchUpdateProfile({ userId, user }) {
  return await api.put(`/users/${userId}`, {
    data: user,
    withCredentials: true,
  });
}
