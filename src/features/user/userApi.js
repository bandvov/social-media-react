import { api } from "../api";

export async function fetchUserProfile(userId) {
  return await api.get(`/users/${userId}/profile`);
}
export async function updateUser({ userId, data }) {
  return await api.put(`/users/${userId}`, {data});
}

export async function fetchUsers(params) {
  return await api.get("/users", {
    params,
  });
}
