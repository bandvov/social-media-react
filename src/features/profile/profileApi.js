import { api } from "../api";

export async function fetchProfileInfo(id) {
  return await api.get(`/users/${id}/profile`, { withCredentials: true });
}
